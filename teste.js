let date = new Date(Date.now()).toLocaleDateString('en-us',{
    dataStyle:'short',
    timeZone:'UTC'
});
console.log(date)
const date2 = new Date('2024-01-02');
const data3 = new Date('2024-02-03')
console.log(data3)

// console.log(date.toLocaleDateString('pt-br',{
//     dataStyle:'short',
//     timeZone:'UTC'
// }) === date2.toLocaleDateString('pt-br',{
//     dataStyle:'short',
//     timeZone:'UTC'
// }))
