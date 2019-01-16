import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @Output() selectedView = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  // onSelect(selected:string){
  //   this.selectedView.emit(selected);
  // }
}
