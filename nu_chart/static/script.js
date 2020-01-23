function parseData(create_chart){
    Papa.parse("../../static/data.csv",{
        download:true,
        complete: function(results){
            create_chart(results.data);
            // console.log(results.data)
        }
    });
}

function create_chart(data){
    var districts = ['Districts',];
    var prerna = ['Prerna',];
    var sadhana = ['Sadhana',];
    var class_appropriate = ['Class Approriate',];

    for (i=1;i<=8;i++){

        // To generate charts dynamically we have to generate 8 charts using JS Dom
        var charttag = document.createElement('div');
        charttag.id = `donut_chart${i}`;
        var itemtag = document.createElement('div');
        itemtag.className+='carousel-item';
        if(i==1){
            itemtag.className+=' active'
        }
        itemtag.appendChild(charttag);
        document.querySelector('.carousel-inner').appendChild(itemtag);

        // var coltag = document.createElement('div');
        // coltag.className+='col-sm';
        // coltag.appendChild(charttag);
        // document.querySelector('.row').appendChild(coltag);

        // Pushing the parsed data from csv file into arrays
        districts.push(data[i][0]);
        prerna.push(data[i][1]);
        sadhana.push(data[i][2]);
        class_appropriate.push(data[i][3]);

        // if(i==8){
        //     console.log(districts)
        //     console.log(prerna)
        //     console.log(sadhana)
        //     console.log(class_appropriate)
        // }

        // Generate the chart using data inside array.
        var donut_chart = c3.generate({
            bindto:`#donut_chart${i}`,
            data:{
                columns:[
                [prerna[0]].concat([prerna[i]]),
                [sadhana[0]].concat([sadhana[i]]),
                [class_appropriate[0]].concat([class_appropriate[i]]),
                ],
                type:'donut',
            },
            donut:{
                title:districts[i]
            },
            tooltip:{
                show:true
            },
        });
    }
}

parseData(create_chart);