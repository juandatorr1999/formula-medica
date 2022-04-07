import { Component } from '@angular/core';
import { jsPDF } from "jspdf";
import {OnInit, ViewChild } from '@angular/core';

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  selectVariable: string; 
  name: string;
  doc: any;
  @ViewChild('iframePDF', {static: false}) pdfFile;

  constructor() {}

  ngOnInit(){
  }

  createPDF() {
    this.doc = new jsPDF();
    this.doc.setFontSize(15);
    var today = new Date();
    var date = today.getDate()+'-'+(months[today.getMonth()])+'-'+today.getFullYear();
    var minute = today.getMinutes()
    if (minute < 10) {
      var newMinute = minute.toString()
      newMinute = '0' + minute
      var time = today.getHours() + ":" + newMinute;
    } else {
      var time = today.getHours() + ":" + today.getMinutes();
    }
    
    var dateTime = date+' '+time;
    this.doc.text(dateTime,35,15)

    this.doc.text(this.name,35,35);
    var y = 50
    for (let i = 0; i < this.selectVariable.length; i++) { 
      this.doc.text(this.selectVariable[i],35,y)
      y += 15
    }
    console.log(this.selectVariable)
    
    var str = this.doc.output('datauristring');
    console.log(str);
    const PDFFileContent = `<iframe height=400 type="application/pdf" src=${str}> </iframe>`;
    this.pdfFile.nativeElement.innerHTML = PDFFileContent;

  }

  savePDF() {
    this.doc.save('formula_medica_camilo.pdf');
  }

}
