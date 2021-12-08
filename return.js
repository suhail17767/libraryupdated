import { LightningElement , wire , track} from 'lwc';
import getborrow from '@salesforce/apex/library.getborrow';
import returnbook from '@salesforce/apex/library.returnbook';
export default class Return extends LightningElement {

    @track columns = [
        { label: 'Id', fieldName: 'Name' },
        { label: 'Book ID', fieldName: 'Book_ID__c' },
        { label: 'Book Name', fieldName: 'Book_Name__c'} ,
        { label: 'Issue Date', fieldName: 'Issue_Date__c'} ,
        { label: 'Return Date', fieldName: 'Return_Date__c'}
     ];

    @track BookList;

    @track lstSelectedLeads;
    @track m;


 
     @wire(getborrow) wiredBooks({data,error}){
        if (data) {
             this.BookList = data;
        console.log(data); 
        } else if (error) {
        console.log(error);
        }
   }


   getSelectedRec() {

    var selectedRecords =  
   this.template.querySelector("lightning-datatable").getSelectedRows();  
  console.log('selectedRecords are ',selectedRecords);
  this.lstSelectedLeads = selectedRecords;

  returnbook({ obj : this.lstSelectedLeads }).
        then(result=> {this.m = result;}).
        catch(error=>{this.b=error;  })
        alert("Success");

}
}