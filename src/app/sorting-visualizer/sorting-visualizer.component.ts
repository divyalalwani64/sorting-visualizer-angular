import { Component, OnInit } from '@angular/core';

import { getMergeSortAnimations } from '../Algo/mergeSort';
import { getAnimationsForBubbleSort } from '../Algo/BubbleSort'
import { getAnimationsForQuickSort } from '../Algo/quickSort';
import { getAnimationsForHeapSort } from '../Algo/heapSort';

@Component({
  selector: 'app-sorting-visualizer',
  templateUrl: './sorting-visualizer.component.html',
  styleUrls: ['./sorting-visualizer.component.scss']
})
export class SortingVisualizerComponent implements OnInit {
  array: number[] = [];
  ANIMATION_SPEED_MS = 10;

  // Change this value for the number of bars (value) in the array.
  NUMBER_OF_ARRAY_BARS = 170;

  // This is the main color of the array bars.
  PRIMARY_COLOR = 'blue';

  // This is the color of array bars that are being compared throughout the animations.
  SECONDARY_COLOR = 'red';

  // This is the color of array bars for pivot element, used in quick sort.
  PIVOT_COLOR = "green";

  SELECTED_ALGORITHM = ''

  NUMBER_OF_SWAP = 0;
  color: string = this.PRIMARY_COLOR;

  constructor() {
  }

  ngOnInit(): void {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.NUMBER_OF_ARRAY_BARS; i++) {
      array.push(this.randomIntFromInterval(5, 550));
    }
    this.array = array;
  }

  mergeSort() {
    this.SELECTED_ALGORITHM = "Merge Sort";
    const arrayCopy = JSON.parse(JSON.stringify(this.array));
    const animations = getMergeSortAnimations(arrayCopy);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = Array.from(document.getElementsByClassName('array-item') as HTMLCollectionOf<HTMLElement>);
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? this.SECONDARY_COLOR : this.PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    this.SELECTED_ALGORITHM = "Quick Sort";
    let arrayBars = document.getElementsByClassName('array-item');
    let animations = getAnimationsForQuickSort(this.array);

    for (let i = 0; i < animations.length; i++) {
      let check = animations[i][0];
      if (check === "pivoton") {
        let pivotBar = animations[i][1];
        const barPivotStyle = <HTMLElement>arrayBars[pivotBar];
        setTimeout(() => {
          barPivotStyle.style.backgroundColor = this.PIVOT_COLOR;
        }, i * this.ANIMATION_SPEED_MS);
      }
      else if (check === "highLighton") {
        const [barOneIdx, barTwoIdx] = animations[i].slice(1);
        const barOneStyle = <HTMLElement>arrayBars[barOneIdx];
        const barTwoeStyle = <HTMLElement>arrayBars[barTwoIdx];

        setTimeout(() => {
          barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
          barTwoeStyle.style.backgroundColor = this.SECONDARY_COLOR;
        }, i * this.ANIMATION_SPEED_MS);
      }
      else if (check === "highLightoff") {
        const [barOneIdx, barTwoIdx] = animations[i].slice(1);
        const barOneStyle = <HTMLElement>arrayBars[barOneIdx];
        const barTwoeStyle = <HTMLElement>arrayBars[barTwoIdx];

        setTimeout(() => {
          barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
          barTwoeStyle.style.backgroundColor = this.PRIMARY_COLOR;
        }, i * this.ANIMATION_SPEED_MS);
      }
      else if (check === "pivotOff") {
        let pivotBar = animations[i][1];
        const barPivotStyle = <HTMLElement>arrayBars[pivotBar];
        setTimeout(() => {
          barPivotStyle.style.backgroundColor = this.PRIMARY_COLOR;
        }, i * this.ANIMATION_SPEED_MS);
      }
      else if (check === "swap") {
        const [barIndexOne, barValueOne, barIndexTwo, barValueTwo] = animations[i].slice(1);
        const barOneStyle = <HTMLElement>arrayBars[barIndexOne];
        const barTwoeStyle = <HTMLElement>arrayBars[barIndexTwo];

        setTimeout(() => {
          barOneStyle.style.height = `${barValueOne}px`;
          barTwoeStyle.style.height = `${barValueTwo}px`;
          this.NUMBER_OF_SWAP++;
        }, i * this.ANIMATION_SPEED_MS);

      }
    }

  }

  bubbleSort() {
    this.SELECTED_ALGORITHM = "Bubble Sort";
    let animations = getAnimationsForBubbleSort(this.array);
    let arrayBars = document.getElementsByClassName('array-item');

    for (let i = 0; i < animations.length; i++) {
      const [check, v1, v2, v3, v4] = animations[i].slice();
      if (check === "HighLightOn") {
        let barOneStyle = <HTMLElement>arrayBars[v1];
        let barTwoStyle = <HTMLElement>arrayBars[v2];

        setTimeout(() => {
          barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
          barTwoStyle.style.backgroundColor = this.SECONDARY_COLOR;
        }, i * this.ANIMATION_SPEED_MS);
      }
      else if (check === "HighLightOff") {
        let barOneStyle = <HTMLElement>arrayBars[v1];
        let barTwoStyle = <HTMLElement>arrayBars[v2];

        setTimeout(() => {
          barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
          barTwoStyle.style.backgroundColor = this.PRIMARY_COLOR;
        }, i * this.ANIMATION_SPEED_MS);
      }
      else if (check === "Swap") {
        let barOneStyle = <HTMLElement>arrayBars[v1];
        let barTwoStyle = <HTMLElement>arrayBars[v3];

        setTimeout(() => {
          barOneStyle.style.height = `${v2}px`;
          barTwoStyle.style.height = `${v4}px`;
          this.NUMBER_OF_SWAP++;
        }, i * this.ANIMATION_SPEED_MS);
      }
    }
  }

  heapSort() {
    this.SELECTED_ALGORITHM = "Heap Sort";
    let animations = getAnimationsForHeapSort(this.array);
    let arrayBars = document.getElementsByClassName('array-item');

    for (let i = 0; i < animations.length; i++) {
      const [check, v1, v2, v3, v4] = animations[i].slice();
      if (check === "HighLightOn") {
        let barOneStyle = <HTMLElement>arrayBars[v1];
        let barTwoStyle = <HTMLElement>arrayBars[v2];

        setTimeout(() => {
          barOneStyle.style.backgroundColor = this.SECONDARY_COLOR;
          barTwoStyle.style.backgroundColor = this.SECONDARY_COLOR;
        }, i * this.ANIMATION_SPEED_MS);
      }
      else if (check === "HighLightOff") {
        let barOneStyle = <HTMLElement>arrayBars[v1];
        let barTwoStyle = <HTMLElement>arrayBars[v2];

        setTimeout(() => {
          barOneStyle.style.backgroundColor = this.PRIMARY_COLOR;
          barTwoStyle.style.backgroundColor = this.PRIMARY_COLOR;
        }, i * this.ANIMATION_SPEED_MS);
      }
      else if (check === "Swap") {
        let barOneStyle = <HTMLElement>arrayBars[v1];
        let barTwoStyle = <HTMLElement>arrayBars[v3];

        setTimeout(() => {
          barOneStyle.style.height = `${v2}px`;
          barTwoStyle.style.height = `${v4}px`;
          this.NUMBER_OF_SWAP++;
        }, i * this.ANIMATION_SPEED_MS);
      }
    }
  }

  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
