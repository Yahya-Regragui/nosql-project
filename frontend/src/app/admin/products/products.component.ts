import { Component, OnInit } from '@angular/core';
import { productModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

declare var $;
declare var toastr;
declare var Toast;


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:productModel[];
  
  // for image
  SelectedImage:File=null;

  tempID="";


  constructor(private proSer:ProductService) { }

  ngOnInit(): void {
    this.proSer.AllProducts.subscribe(res=>{
      this.products=res
      console.log(this.products)
    });
    
  }

  search(input){
    this.proSer.getFromDb(input);
  }
  
  onSelect(event){
      var tmppath = URL.createObjectURL(event.target.files[0]);
      $("#AddEmpImage").fadeIn("fast").attr('src', tmppath);
      this.SelectedImage=<File>event.target.files[0];

  }

  add(){

    var message;
    const fd = new FormData();
    fd.append('image',this.SelectedImage);
    console.log(this.SelectedImage);
    fd.append('name',$("#name").val());
    fd.append('category',$("#category").val());
    fd.append('brand',$("#brand").val());
    fd.append('price',$("#price").val());
    fd.append('desc',$("#desc").val());
    console.log(fd);

    this.proSer.add(fd).subscribe(
      res=>{
        message=res;
        toastr.success(''+message.message);
        this.proSer.getFromDb("");
      },
      error=>{error.error.error.forEach(element => { toastr.error("Error",element);});
    });
  }
  selectForUpdate(id){
  this.tempID=id;
    this.products.forEach(el=>{
      if(id==el.id){
        $("#uname").prop("value",el.name)
        $("#oldCategory").prop("value",el.category)
        $("#oldCategory").html(el.category)
        $("#oldBrand").prop("value",el.brand)
        $("#oldBrand").html(el.brand)
        $("#uprice").prop("value",el.price)
        $("#udesc").prop("value",el.desc)
        $("#UpdateImage").fadeIn("fast").attr('src', el.imgpath);
      }
    })
  }
  selectForShow(id){
  this.tempID=id;
    this.products.forEach(el=>{
      if(id==el.id){
        $("#sname").prop("value",el.name)
        $("#soldCategory").html(el.category)
        $("#soldBrand").html(el.brand)
        $("#soldCategory").prop("value",el.category)
        $("#soldBrand").prop("value",el.brand)
        $("#sprice").prop("value",el.price)
        $("#sdesc").prop("value",el.desc)
        $("#ShowImage").fadeIn("fast").attr('src', el.imgpath);
      }
    })
  }
  update(){
    var message;
      const fd = new FormData();
      console.log(this.SelectedImage);
      fd.append('id',this.tempID);
      fd.append('name',$("#uname").val());
      fd.append('category',$("#ucategory").val());
      fd.append('brand',$("#ubrand").val());
      fd.append('price',$("#uprice").val());
      fd.append('desc',$("#udesc").val());
      console.log(fd);

      this.proSer.update(fd).subscribe(
        res=>{
          message=res;
          toastr.success(''+message.message);
          this.proSer.getFromDb("");
        },
        error=>{error.error.error.forEach(element => { toastr.error("Error",element);});
      });
  }
  deleteConfirm(id){
    

    this.tempID=id;

    
  }
  delete(){
    var message;

    this.proSer.delete(this.tempID).subscribe(
      res=>{
        message=res;
        toastr.success(''+message.message);
        this.proSer.getFromDb("");
      },
      error=>{error.error.error.forEach(element => { toastr.error("Error",element);});
    });
  }

}
