interface Query {
  [key: string]: any;
}

function translateMongoToSQL(queryString: string): string {
  const regex = /db\.(\w+)\.find\((.*?)(?:,\s*({.*}))?\);/;
  const match = queryString.match(regex);
  
  if (!match || match.length < 3) {
      return 'Error: Invalid MongoDB find query.';
  }

  const collection = match[1];

  let query: Query = {};
  try {
      query = match[2].trim() !== '' ? JSON.parse(match[2]) : {};
  } catch (err) {
      return 'Error: Invalid query criteria.';
  }

  const projection: Query = match[3] ? JSON.parse(match[3]) : {};


  const operatorsMap: { [key: string]: string } = {
      $or: 'OR',
      $and: 'AND',
      $lt: '<',
      $lte: '<=',
      $gt: '>',
      $gte: '>=',
      $ne: '!=',
      $in: 'IN'
  };

  const conditions: string[] = [];
  let fieldsToSelect = '*';
  
  for (const key in query) {
      if (key === '_id' || key === 'id') {
          conditions.push(`${key} = '${query[key]}'`);
      } else if (typeof query[key] === 'object') {
          const subQuery = query[key];
          for (const subKey in subQuery) {
              if (operatorsMap[subKey]) {
                  conditions.push(`${key} ${operatorsMap[subKey]} ${typeof subQuery[subKey] === 'string' ? `'${subQuery[subKey]}'` : subQuery[subKey]}`);
              }
          }
      } else {
          conditions.push(`${key} = '${query[key]}'`);
      }
  }

  if (Object.keys(projection).length > 0) {
      fieldsToSelect = Object.keys(projection)
          .filter(key => projection[key])
          .join(', ');
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  return `SELECT ${fieldsToSelect} FROM ${collection} ${whereClause};`;
}

// Test case
const mongoQuery = "db.user.find({ age: { $gte: 21 } }, { name: 1, _id: 1 });";
console.log(translateMongoToSQL(mongoQuery)); // Output: SELECT name, _id FROM user WHERE age >= 21;

// interface Query {                //UNDERSTAND THIS ONE 
//   [key: string]: any;
// }

// function translateMongoToSQL(queryString: string): string {
//   const parsedQuery = queryString.match(/db\.(\w+)\.find\((.*?)(?:,\s*({.*?}))?(?:},\s*({.*?}))?\);/);   // ADD separation at },{
//   console.log(parsedQuery)
  
//   if (!parsedQuery || parsedQuery.length !== 3) {
//       return 'Error: Invalid MongoDB find query.';
//   }

//   const collection = parsedQuery[1];
//   const query: Query = eval(`(${parsedQuery[2]})`);  ///JSON PARSE on 2 (conditions) and 3 (fields)...destructure each 

//   console.log(query)
//   const operatorsMap: { [key: string]: string } = {
//       $or: 'OR',
//       $and: 'AND',
//       $lt: '<',
//       $lte: '<=',
//       $gt: '>',
//       $gte: '>=',
//       $ne: '!=',
//       $in: 'IN'
//   };

//   const conditions: string[] = [];
//   let fieldsToSelect = '*'; //data inference 
  
//   for (const key in query) {
//       if (key === '_id' || key === 'id') {
//           conditions.push(`${key} = '${query[key]}'`);
//           console.log(`these are the conditions ${conditions}`)
//       } else if (typeof query[key] === 'object') {
//           const subQuery = query[key];
//           for (const subKey in subQuery) {
//               if (operatorsMap[subKey]) {
//                   conditions.push(`${key} ${operatorsMap[subKey]} ${typeof subQuery[subKey] === 'string' ? `'${subQuery[subKey]}'` : subQuery[subKey]}`);
//               }
//           }
//       } else {
//           if (fieldsToSelect === '*') {
//               fieldsToSelect = key;
//           } else {
//               fieldsToSelect += `, ${key}`;     ///object.keys().join(',') and join with a comma
//           }
//           conditions.push(`${key} = '${query[key]}'`);
//       }
//   }

//   const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

//   return `SELECT ${fieldsToSelect} FROM ${collection} ${whereClause};`;
// }

// // Test case
// const mongoQuery = "db.user.find({age: {$gte: 21}},{name: 1, _id: 1});";
// console.log(translateMongoToSQL(mongoQuery)); // Output: SELECT name FROM user WHERE name = 'john';

