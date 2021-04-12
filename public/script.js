async function loadMealsMacros() {
  const requestMeals = await fetch('/api/meals/');
  const dataMeals = await requestMeals.json();

  const requestMacros = await fetch('/api/macros/');
  const dataMacros = await requestMacros.json();

  const mergedObj = dataMeals.map(t1 => 
    ({...t1, ...dataMacros.find(t2 => t2.macro_id === t1.meal_id)}));
  console.table(mergedObj);
  return mergedObj;
}

function getRandomIntInclusive(min, max) {
  newMin = Math.ceil(min);
  newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin);
}


async function populateTable(data) {
  myInts = [];
  iter = 10;
  while (iter > 0) {
    const value = getRandomIntInclusive(1, 46);
    myInts.push(value);
    iter -= 1;
  }

  console.log(myInts);
  newObj = [];
  myInts.forEach((randInt) => {
    newObj.push(data[randInt - 1])
  });

  console.log(newObj);

  newObj.forEach((item) => {
    const myTable = document.getElementById('mytable');
    let newRow = document.createElement('tr');
    
    //MEAL ID
    let thID = document.createElement('th');
    let thIDText = document.createTextNode(item.meal_id);
    thID.appendChild(thIDText);


    //MEAL NAME
    let thName = document.createElement('th');
    let thNameText = document.createTextNode(item.meal_name);
    thName.appendChild(thNameText);

    //CALORIES
    let thCal = document.createElement('th');
    let thCalText = document.createTextNode(item.calories);
    thCal.appendChild(thCalText);

    //CHOLESTEROL
    let thChol = document.createElement('th');
    let thCholText = document.createTextNode(item.cholesterol);
    thChol.appendChild(thCholText);

    //CARBS
    let thCarbs = document.createElement('th');
    let thCarbsText = document.createTextNode(item.carbs);
    thCarbs.appendChild(thCarbsText);

    //PROTEIN
    let thProtein = document.createElement('th');
    let thProteinText = document.createTextNode(item.protein);
    thProtein.appendChild(thProteinText);

    //FAT
    let thFat = document.createElement('th');
    let thFatText = document.createTextNode(item.fat);
    thFat.appendChild(thFatText);

    newRow.appendChild(thID);
    newRow.appendChild(thName);
    newRow.appendChild(thCal);
    newRow.appendChild(thChol);
    newRow.appendChild(thCarbs);
    newRow.appendChild(thProtein);
    newRow.appendChild(thFat);

    myTable.appendChild(newRow);
  });

  let myChart = new CanvasJS.Chart("chartContainer", {
    title:{
      text: "UMD Meals and Macros"
    },
    axisX: {
      valueFormatString: "string"
    },
    axisY: {
      valueFormatString: 10
    },
    data: [{
      type: "stackedBar",
      name: "Protein",
      showInLegend: "true",
      dataPoints: [
        {label: newObj[0].meal_name, y: newObj[0].protein},
        {label: newObj[1].meal_name, y: newObj[1].protein},
        {label: newObj[2].meal_name, y: newObj[2].protein},
        {label: newObj[3].meal_name, y: newObj[3].protein},
        {label: newObj[4].meal_name, y: newObj[4].protein},
        {label: newObj[5].meal_name, y: newObj[5].protein},
        {label: newObj[6].meal_name, y: newObj[6].protein},
        {label: newObj[7].meal_name, y: newObj[7].protein},
        {label: newObj[8].meal_name, y: newObj[8].protein},
        {label: newObj[9].meal_name, y: newObj[9].protein}
      ]
    },
    {
      type: "stackedBar",
      name: "Fat",
      showInLegend: "true",
      dataPoints: [
        {label: newObj[0].meal_name, y: newObj[0].fat},
        {label: newObj[1].meal_name, y: newObj[1].fat},
        {label: newObj[2].meal_name, y: newObj[2].fat},
        {label: newObj[3].meal_name, y: newObj[3].fat},
        {label: newObj[4].meal_name, y: newObj[4].fat},
        {label: newObj[5].meal_name, y: newObj[5].fat},
        {label: newObj[6].meal_name, y: newObj[6].fat},
        {label: newObj[7].meal_name, y: newObj[7].fat},
        {label: newObj[8].meal_name, y: newObj[8].fat},
        {label: newObj[9].meal_name, y: newObj[9].fat}
      ]
    },
    {
      type: "stackedBar",
      name: "Carbs",
      showInLegend: "true",
      dataPoints: [
        {label: newObj[0].meal_name, y: newObj[0].carbs},
        {label: newObj[1].meal_name, y: newObj[1].carbs},
        {label: newObj[2].meal_name, y: newObj[2].carbs},
        {label: newObj[3].meal_name, y: newObj[3].carbs},
        {label: newObj[4].meal_name, y: newObj[4].carbs},
        {label: newObj[5].meal_name, y: newObj[5].carbs},
        {label: newObj[6].meal_name, y: newObj[6].carbs},
        {label: newObj[7].meal_name, y: newObj[7].carbs},
        {label: newObj[8].meal_name, y: newObj[8].carbs},
        {label: newObj[9].meal_name, y: newObj[9].carbs}
      ]   
    }]
    
  })
  myChart.render();
}


async function windowActions() {
  const myData = await loadMealsMacros();
  populateTable(myData);
}

window.onload = windowActions;