interface Query {
  [key: string]: any;
}

function translateMongoToSQL(queryString: string): string {
  const regex = /db\.(\w+)\.find\(({.*?})(?:,\s*({.*}))?\);/;  //separates the different parts of the mongo query

  const match = queryString.match(regex);  //all parts are now in an array
  console.log(match)
  if (!match || match.length < 3) {   //[0]- entire mongo query [1]- collection name [2]- conditions object [3]- fieldsToSelect object
      return 'Error: Invalid MongoDB find query.';
  }

  const collection = match[1];

  let query: Query = {};  //query will be a Query object with the interface expectations of keys made of strings and values of any data type
  try {
    query = match[2].trim() !== '' ? eval(`(${match[2]})`) : {}; //if match[2] has content then evaluate the object as JS code, else assign it an empty object
//JSON5 WOULD'VE WORKED!
  } catch (err) {
      return 'Error: Invalid conditional query criteria.';
  }

  let fieldsToSelect: Query = {};
  try {
      fieldsToSelect = match[3] ? eval(`(${match[3]})`) : {};
  } catch (err) {
    return 'Error: Invalid field query criteria.';
  }

  const operatorsMap: { [key: string]: string } = {  //hashmap of valid mongodb operators to its sql counterparts
      $or: 'OR',
      $and: 'AND',
      $lt: '<',
      $lte: '<=',
      $gt: '>',
      $gte: '>=',
      $ne: '!=',
      $in: 'IN'
  };

  const conditions: string[] = []; //query may hold more than one condition, ergo array

  for (const key in query) {
      if (key === '_id' || key === 'id') {
          conditions.push(`${key} = '${query[key]}'`);
      } else if (typeof query[key] === 'object') {  //indicates a nested object or operator
          const subQuery = query[key];
          for (const subKey in subQuery) {  //extract nested obj
              if (operatorsMap[subKey]) {  
                  conditions.push(`${key} ${operatorsMap[subKey]} ${typeof subQuery[subKey] === 'string' ? `'${subQuery[subKey]}'` : subQuery[subKey]}`);
              }
          }
      } else {
          conditions.push(`${key} = '${query[key]}'`);
      }
  }

  const fields = Object.keys(fieldsToSelect).filter(key => fieldsToSelect[key]);   //filter keys that are truthy and assign to const fields

  const fieldsToSelectString = fields.length > 0 ? fields.join(', ') : '*';
  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  return `SELECT ${fieldsToSelectString} FROM ${collection} ${whereClause};`;
}

// Test case
const mongoQuery = "db.user.find({ age: { $lt: 25, $gt: 21, $ne: 22 } });";
console.log(translateMongoToSQL(mongoQuery)); // Output: SELECT name, age FROM user WHERE _id = '23113';


