# iot_delfin_db

## Usage

``` js
const setupDatabase = require('delfin-investigation-db')

setupDabase(config).then(db => {
  const { Agent, Metric } = db
}).catch(err => console.error(err))
```
