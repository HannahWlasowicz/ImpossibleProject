import { Doughnut } from 'react-chartjs-2';
import React from 'react';


const PieChart = () => {
  return <div>
    <Doughnut
    // const config = {
    //   type: 
    // }
    
      data={{
        labels: ["Red", "Blue"],
        datasets: [{
            label: '# of Votes',
            data: [12],
            backgroundColor: ['rgba(255,99,132,0.2)'],
            borderWidth: 1,
            clip: 10,
            
          },
          {
            label: '# of Points',
            data: [7],
            backgroundColor: ['rgba(150,200,132,0.2)'],
            borderWidth: 1
          }
        ]
      }}
      height={500}
      width ={500}
      options={{
        maintainAspectRatio: false
      }}
    />
  </div>
}

export default PieChart