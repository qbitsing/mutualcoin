# MutualCoin DB

MQTT module for the platform mutualcoin.com

## Events

``` js
sokcet.on('block/change/state', (block) => {
  { uuid, state, date } = block
})

sokcet.on('block/earnings', (block) => {
  { uuid, daysInfo } = block
})

sokcet.on('block/makePay', (block) => {
  { uuid, pays } = block
})

sokcet.on('block/amount', (block) => {
  { uuid, amount, amountLeft } = block
})

socket.on('blockUser/add', (blockUser) => {
  { ... } = blockUser
})

```