export function getMongoUri(
  _username: string,
  _password: string,
  host: string,
  port: string,
  databaseName: string
): string {
  //return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
  return `mongodb://${host}:${port}/${databaseName}`;
}
