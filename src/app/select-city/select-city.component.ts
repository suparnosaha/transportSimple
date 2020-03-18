import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.css']
})
export class SelectCityComponent implements OnInit {
  errorMessage: string;
  loading: boolean;

  constructor(private sanitizer: DomSanitizer) { }

  @ViewChild('search',{static: false}) searchTextBox: ElementRef;

  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  selectedValues = [];
  data: string[] = [ 'A1',
  'A2',
  'A3',
  'B1',
  'B2',
  'B3',
  'C1',
  'C2',
  'C3'];
  boxHidden: boolean= true;
  filteredOptions: Observable<any[]>;
  value:string="";
  origin: string="";
  destination: string="";
  originArray: string[]=[];
  destinationArray: string[]=[];
  journeyList: string[]=[];
  upperCurve: string =" M 100,350 C 180,370 180,250 250,250 ";
  lowerCurve: string =" M 100,350 C 180,350 180,450 250,450 ";
  x1:number = 0;
  x2: number= 70;
  x3: number= 150;
  svg:SafeHtml
  addNew()
  {
    this.boxHidden= !(this.boxHidden);
  }
 
  addCity(){
    if(this.data.includes((this.value).toUpperCase())|| this.value ==="")
    {
      this.errorMessage="City already exist";
      console.log(this.errorMessage);
    }
    else
    this.data.push((this.value).toUpperCase());
    console.log(this.data);
    this.boxHidden= true;
  }

  selectedDestination(event: any)
  {
    this.destination=(event.source.value);
    console.log(this.destination);
  }

  selectedOrigin(event: any){
    this.origin=(event.source.value);
    console.log(this.origin);
  }

  addPath()
  {
    this.loading=true;
   if(this.origin != undefined && this.destination != undefined)
    {this.journeyList.push(this.origin.toUpperCase()+"-"+
    this.destination.toUpperCase());
    console.log(this.journeyList);
   this.originArray.push(this.origin);
   this.destinationArray.push(this.destination);
   this.loading=false;
    }
  }
  ngOnInit() {
    /**
     * Set filter event based on value changes 
     */
    this.filteredOptions = this.searchTextboxControl.valueChanges
      .pipe(
        startWith<string>(''),
        map(name => this._filter(name))
      );
  }

  /**
   * Used to filter data based on search input 
   */
  private _filter(name: string): String[] {
    const filterValue = name.toLowerCase();
    // Set selected values to retain the selected checkbox state 
    // this.setSelectedValues();
    this.selectFormControl.patchValue(this.selectedValues);
    let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }


  openedChange(e) {
    // Set search textbox value as empty while opening selectbox 
    this.searchTextboxControl.patchValue('');
    // Focus to search textbox while clicking on selectbox
    if (e == true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

}

