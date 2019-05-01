import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CafeService} from '../services/cafe.service';
import {TypeDrink} from '../models/TypeDrink';
import {Response} from '../models/Response';
import {TypeFood} from '../models/TypeFood';
import {Drink} from '../models/Drink';
import {Food} from '../models/Food';
import {TypeFoodService} from '../services/type-food.service';
import {TypeDrinkService} from '../services/type-drink.service';
import {FoodService} from '../services/food.service';
import {DrinkService} from '../services/drink.service';


@Component({
  selector: 'app-menu-workspace',
  templateUrl: './menu-workspace.component.html',
  styleUrls: ['./menu-workspace.component.css']
})
export class MenuWorkspaceComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private cafeService: CafeService,
    private typeDrinkService: TypeDrinkService,
    private typeFoorService: TypeFoodService,
    private foodService: FoodService,
    private drinkService: DrinkService
  ) {
  }

  showButtonAddType = true;
  table;
  type = 'food';
  isLogged;
  typeDrink: TypeDrink[];
  typeFood: TypeFood[];
  drink: Drink[];
  food: Food[];
  showAddTypeForm = false;
  typeData;
  showEditDiv = false;
  editTypeDrinkData;
  newTypeDrink;
  typeDrinkToUpdate;
  showDrinkAndFood;


  ngOnInit() {
    this.table = +this.route.snapshot.paramMap.get('table');
    this.subscribeToLogin();
    this.getAllTypeFood();
    this.getAllTypeDrink();

  }

  getAllTypeDrink() {
    this.typeDrinkService.getAllTypeDrinkData()
      .subscribe((response: Response) => {
        if (response.success) {
          this.typeDrink = response.message;
        }
      });
  }

  // get Type Food
  getAllTypeFood() {
    this.typeFoodServise.getAllTypeFoodData()
      .subscribe((response: Response) => {
        if (response.success) {
          this.typeFood = response.message;
        }
      });
  }

  subscribeToLogin() {
    this.cafeService.isLogged.subscribe((data) => {
      this.isLogged = data;
    });
  }

  foodClicked(): void {
    this.type = 'food';

  }

  drinkClicked(): void {
    this.type = 'drink';
  }

  openInputAddType() {
    this.showAddTypeForm = true;
  }

  // add new TypeDrink
  sendTypeData(type: string): void {
    this.typeData = {
      type
    };
    if (this.type === 'drink') {
      this.typeDrinkService.addNewTypeDrink(this.typeData)
        .subscribe((response: Response) => {
          if (response.success) {
            console.log(response.message);
            this.getAllTypeDrink();
          }
        });
    } else if (this.type === 'food') {
      this.typeFoodServise.addNewTypeFood(this.typeData)
        .subscribe((response: Response) => {
          if (response.success) {
            console.log(response.message);
            this.getAllTypeFood();
          }
        });
    }
  }

  closeForm() {
    this.showAddTypeForm = false;
  }

// delete DRINK TYPE
  deleteTypeDrink(type) {
    this.typeDrinkService.deleteTypeDrink(type)
      .subscribe((response: Response) => {
        if (response.success) {
          console.log(response.message);
          this.getAllTypeDrink();
        }
      });
  }

  // EDITE FORM TO DRINK TYPE
  showEditInput(type) {
    this.newTypeDrink = type;
    this.typeDrinkToUpdate = type.type;
    this.showEditDiv = true;
  }

  editTypeDrink() {
    this.editTypeDrinkData = this.newTypeDrink;
    this.typeDrinkService.editTypeDrinks(this.typeDrinkToUpdate, this.editTypeDrinkData)
      .subscribe((response: Response) => {
        if (response.success) {
          console.log(response.message);
        }
      });
  }

  // ShowDrink
  showThisDrink(type) {
    this.drinkService.getSomeDrink(type)
      .subscribe((response: Response) => {
        if (response.success) {
          this.drink = response.message;
          // console.log(response.message);
          this.type = '';
          this.showDrinkAndFood = true;
          this.showButtonAddType = false;
        }
      });
  }
}


