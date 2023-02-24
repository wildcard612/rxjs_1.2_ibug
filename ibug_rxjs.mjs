import { of } from 'rxjs';
import { filter, mergeMap, reduce } from 'rxjs/operators';


let persons = [
    {
        id: 1,
        name: "Jan Kowalski"
    }, {
        id: 2,
        name: "John Doe"
    }, {
        id: 3,
        name: "Jarek Kaczka"
    }
]

let ages = [
    {
        person: 1,
        age: 18
    }, {
        person: 2,
        age: 24
    }, {
        person: 3,
        age: 666
    }
]

let locations = [
    {
        person: 1,
        country: "Poland"
    }, {
        person: 3,
        country: "Poland"
    }, {
        person: 1,
        country: "USA"
    }
]

of(...ages)
  .pipe(
    filter(ageObj => locations.find(locObj => locObj.person === ageObj.person && locObj.country === "Poland")),
    mergeMap(ageObj => of(ageObj.age)),
    reduce((acc, curr) => acc + curr, 0),
    mergeMap(totalAge => of(totalAge / ages.filter(ageObj => locations.find(locObj => locObj.person === ageObj.person && locObj.country === "Poland")).length))
  )
  .subscribe(avgAge => console.log(`The average age of people living in Poland is ${avgAge}`));


