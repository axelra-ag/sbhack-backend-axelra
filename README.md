# sbhack-backend-axelra

**Routes**

**maps**

_post_ `/maps/get-directions`

`{
    start: 'Morgentalstrasse 67 8038 Zürich',
    end: 'Bahnhofstrasse 3, 8001 Zürich'
}`

_get_ `/maps/get-stations`

_post_ `/maps/get-closest-station`

`{
    address = 'Morgentalstrasse 67 8038 Zürich'
}`

_get_ `/maps/get-checkpoints`

_post_ `/maps/achieve-point`

`{
    coordinates: [47.384827, 8.531721],
    checkPoint: 5
}`

_post_ `/maps/get-distance-between`

`
{
    "start": [47.403289, 8.607952],
    "end": [47.403289, 8.607915]
}
`

**user**

_post_ `/user/add`

`{
    name: 'John Wick '
    email: johnwick@axelra.com
}`

_post_ `/user/edit`

`{
    userID: '5d0de931f854b34f1cc7bd2c'
    name: 'Peter Wick'
    email: 'peterwick@axelra.com'
}`

_post_ `/user/profile`

`{
    userID: '5d0de931f854b34f1cc7bd2c'
}`

**challenge**

_get_ `/`

_post_ `/challenge/my-challenges`

`{
    userID: '5d0de931f854b34f1cc7bd2c'
}`

_post_ `/challenge/start`

`{
    userID: '5d0de931f854b34f1cc7bd2c'
    challengeID: '5d0de917f854b34f1cc7bd29'
}`

_post_ `/challenge/end`

`{
    userID: '5d0de931f854b34f1cc7bd2c'
    challengeID: '5d0de917f854b34f1cc7bd29'
}`