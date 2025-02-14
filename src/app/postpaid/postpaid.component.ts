import { Component, OnInit } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-postpaid',
  templateUrl: './postpaid.component.html',
  styleUrls: ['./postpaid.component.css']
})
export class PostpaidComponent implements OnInit {
 viPlans = [{
    'plan_price':"",
    'plan_talktime':"",
    'plan_data':"",
    'id':''
  }]

  constructor() {
  (async () => {
        try {
          this.viPlans = (await axios.get("http://localhost:8000/postplan")).data
          console.log(this.viPlans)
        } catch (error) {
          console.log(error)
        }
    })()
}
recharge = async (planObject:any) => {
  if(window.sessionStorage['id'] == 'undefined' || window.sessionStorage['id'] == undefined)
  {
    window.location.href="login?error=Please login to recharge or pay bills";
  }else{
    let newRecharge = new FormData()
    newRecharge.append('id',window.sessionStorage['id'])
    newRecharge.append('pid',planObject.id)
    const resp = (await axios.post("http://localhost:8000/recharge",newRecharge)).data
    if(resp=="connection/bank?plan=True"){
      console.log(planObject.price)
      window.sessionStorage['price']=planObject.price;
    }

    window.location.href=resp;
  }
}

  ngOnInit(): void {
  }

}
