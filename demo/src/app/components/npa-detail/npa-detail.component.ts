import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-npa-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './npa-detail.component.html',
  styleUrls: ['./npa-detail.component.css']
})
export class NpaDetailComponent implements OnInit {
  npaId: number | null = null;
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.npaId = params['id'];
      console.log('NPA Detail - ID:', this.npaId);
      // Here you would typically fetch the NPA details from the API
      // this.loadNpaDetails(this.npaId);
    });
  }
}
