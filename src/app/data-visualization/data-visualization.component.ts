import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rroll-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.scss']
})
export class DataVisualizationComponent implements OnInit {

  objectId: string | null = "";


  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.objectId = this.route.snapshot.paramMap.get('objectId');
  }

}
