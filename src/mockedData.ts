export interface Idata {
  id: string;
  color: string;
  data: {
      x: string;
      y: number;
  }[];
}[]

export interface IDataPie {
  id:string,
  label:string,
  value:number,
  color:string
}[]


export const data:Idata[] = [
    {
      "id": "norway",
      "color": "hsl(33, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 216
        },
        {
          "x": "helicopter",
          "y": 99
        },
        {
          "x": "boat",
          "y": 81
        },
        {
          "x": "train",
          "y": 73
        },
        {
          "x": "subway",
          "y": 193
        },
        {
          "x": "bus",
          "y": 268
        },
        {
          "x": "car",
          "y": 12
        },
        {
          "x": "moto",
          "y": 194
        },
        {
          "x": "bicycle",
          "y": 112
        },
        {
          "x": "horse",
          "y": 296
        },
        {
          "x": "skateboard",
          "y": 8
        },
        {
          "x": "others",
          "y": 261
        }
      ]
    }
  ]

  export const dataPie:IDataPie[] = [
    {
      "id": "xBTC",
      "label": "xBTC",
      "value": 3.5,
      "color": "hsl(233, 34%, 38%)"
    },
    {
      "id": "xETH",
      "label": "xETH",
      "value": 5,
      "color": "hsl(175, 43%, 33%)"
    },
    {
      "id": "xSOL",
      "label": "xSOL",
      "value": 5.5,
      "color": "hsl(201, 72%, 29%)"
    },
    {
      "id": "xBNB",
      "label": "xBNB",
      "value": 6,
      "color": "hsl(52, 32%, 52%)"
    },
    {
      "id": "xFFT",
      "label": "xFFT",
      "value": 6.3,
      "color": "hsl(215, 73%, 42%)"
    },
    {
      "id": "xUSD",
      "label": "xUSD",
      "value": 6.5,
      "color": "hsl(267, 41%, 56%)"
    },
    {
      "id": "xSRM",
      "label": "xSRM",
      "value": 7,
      "color": "hsl(195, 60%, 44%)"
    },
    {
      "id": "xLTC",
      "label": "xLTC",
      "value": 9,
      "color": "hsl(236, 24%, 78%)"
    },
    {
      "id": "xAAVE",
      "label": "xAAVE",
      "value": 9.7,
      "color": "hsl(319, 30%, 44%)"
    },
    {
      "id": "xDOGE",
      "label": "xDOGE",
      "value": 10,
      "color": "hsl(27, 41%, 44%)"
    },
    {
      "id": "xLUNA",
      "label": "xLUNA",
      "value": 31.5,
      "color": "hsl(358, 58%, 47%)"
    }
  ]