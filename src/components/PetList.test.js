import { groupByGender } from './PetList';

test('group by gender', () => {
  let json = '[{"name":"Bob","gender":"Male","age":23,"pets":[{"name":"Garfield","type":"Cat"},{"name":"Fido","type":"Dog"}]},{"name":"Jennifer","gender":"Female","age":18,"pets":[{"name":"Garfield","type":"Cat"}]},{"name":"Steve","gender":"Male","age":45,"pets":null},{"name":"Fred","gender":"Male","age":40,"pets":[{"name":"Tom","type":"Cat"},{"name":"Max","type":"Cat"},{"name":"Sam","type":"Dog"},{"name":"Jim","type":"Cat"}]},{"name":"Samantha","gender":"Female","age":40,"pets":[{"name":"Tabby","type":"Cat"}]},{"name":"Alice","gender":"Female","age":64,"pets":[{"name":"Simba","type":"Cat"},{"name":"Nemo","type":"Fish"}]}]';
  let arrObj = JSON.parse(json);
  let expected = '[{"gender":"Male","data":[{"name":"Bob","gender":"Male","age":23,"pets":[{"name":"Garfield","type":"Cat"},{"name":"Fido","type":"Dog"}]},{"name":"Steve","gender":"Male","age":45,"pets":null},{"name":"Fred","gender":"Male","age":40,"pets":[{"name":"Tom","type":"Cat"},{"name":"Max","type":"Cat"},{"name":"Sam","type":"Dog"},{"name":"Jim","type":"Cat"}]}]},{"gender":"Female","data":[{"name":"Jennifer","gender":"Female","age":18,"pets":[{"name":"Garfield","type":"Cat"}]},{"name":"Samantha","gender":"Female","age":40,"pets":[{"name":"Tabby","type":"Cat"}]},{"name":"Alice","gender":"Female","age":64,"pets":[{"name":"Simba","type":"Cat"},{"name":"Nemo","type":"Fish"}]}]}]';
  const newJson = groupByGender(arrObj);
  var jsonStr = JSON.stringify(newJson);
  expect(expected).toEqual(jsonStr);
});