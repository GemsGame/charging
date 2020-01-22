class Controller {
  constructor() {}
  events() {
    document.addEventListener("click", () => {
      this.event = event.target.id;
      this.renderDescription(this.event);
      this.renderBuyWIndow(this.event);
      this.renderSendForm(this.event);
      this.renderQuestionForm(this.event);
      this.filter();
      console.log(this.event);
    });
  }

  filter() {
    if (this.event == "cat") {
      this.renderCatalog(event.target.value);
    }
  }
}

class Model extends Controller {
  constructor() {
    super();
  }
  getContent() {
    fetch(
      "https://spreadsheets.google.com/feeds/list/1KSJUJi1lW8qT-lU9r5jXj-gv4bUSiN49SQZ-1fGua7M/od6/public/values?alt=json"
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        view.renderSidebar(data.feed.entry);
        view.renderCatalog();
      });
  }
}
class View extends Model {
  constructor() {
    super();
  }
  renderSidebar(data) {
    let arr = [];
    this.data = data;
    data.forEach(element => {
      console.log(element.gsx$category.$t);
      arr.push(element.gsx$category.$t);
    });
    let unique = [...new Set(arr)];
    console.log(unique);
    unique.forEach(element => {
      const item = document.createElement("a");
      item.href = `#${element}`;
      item.className = "item";
      item.id = "cat";
      item.value = element;
      //<i class="laptop icon"></i>
      item.innerHTML = `${element}`;
      document.querySelector(".ui.vertical.menu").appendChild(item);
    });
  }
  renderTitle() {
    document.querySelector("title").innerHTML = this.event;
  }
  renderH1() {
    document.querySelector(
      "h1"
    ).innerHTML = `Зарядное устройство для ноутбука ${this.event}`;
  }
  renderCatalog(filter) {
    console.log(filter);
    document.querySelector(".content").innerHTML = "";
    this.data.forEach(element => {
      if (element.gsx$category.$t.includes(filter) || filter == undefined) {
        const row = document.createElement("div");
        row.href = `#${element.gsx$name.$t}`;
        row.className = "row";
        row.id = `${element.gsx$name.$t}`;
        row.innerHTML = ` <div class="ui card">
        <div class="content">
        <div class="header">${element.gsx$name.$t}</div>
        </div>
        <div class="image">
       
          <img src="${element.gsx$img.$t}">
        </div>
        <div class="content">
    
          <div class="description">
          <div class="ui statistic">
          <div class="label">
          <del>65 руб.</del>
        </div>
          <div class="value">
          ${element.gsx$price.$t}
          </div>
          <div class="label">
            руб.
          </div>
        </div>
          </div>
        </div>
        <div class="ui two bottom attached buttons">
          <div class="ui violet button" id="des${element.gsx$id.$t}">
            <i class="question icon"></i>
           Подробнее
          </div>
          <div class="ui green button" id="buy${element.gsx$id.$t}">
            <i class="
            check circle outline icon"></i>
           Купить
          </div>
        </div>
      </div>`;
        document.querySelector(".content").appendChild(row);
        const description = document.createElement("div");
        description.className = "ui container";
        description.innerHTML = `<div class="ui large modal" id="des_des${
          element.gsx$id.$t
        }"><i class="close icon"></i><div class="header">
        ${element.gsx$name.$t} - цена: ${element.gsx$price.$t} руб 
     </div><div class="image content">
         <div class="ui small image">
           <img src="${element.gsx$img.$t}">
           <div class="actions" style="text-align: center;" >
           <div class="ui green button" id="buy${element.gsx$id.$t}">
            <i class="
            check circle outline icon"></i>
           Купить
          </div>
     </div>
         </div>
         <div class="description">
     ${element.gsx$description.$t}
     <div class="ui grid">

<div class="four wide column"><div class="icon"><img src="img/lightning.svg"> <br>Защита от перегрузки</div></div>
<div class="four wide column"><div class="icon"><img src="img/wire.svg"><br> Защита от короткого замыкания</div></div>
<div class="four wide column"> <div class="icon"><img src="img/electricity.svg"><br> Защита от перенапряжения </div></div>
<div class="four wide column"> <div class="icon"><img src="img/secure.svg"><br> Стандарты безопасности: CE FCC ROSH IEC MSDS</div></div>

</div>
  <table class="ui celled table align center">
  <thead>

  </thead>
  <tbody>
    <tr>
    <td class="positive" style="text-align:center"><i class="icon checkmark"></i>Хорошее качество устройства</td>
      <td class="positive" style="text-align:center"><i class="icon checkmark"></i>Гарантия 12 месяцев</td>
      <td class="positive" style="text-align:center"><i class="icon checkmark"></i>Оплата после проверки</td>
      <td class="positive" style="text-align:center"><i class="icon checkmark"></i>Быстрая доставка по Минску</td>
    </tr>
   
  </tbody>
</table>  <!--
 <div class="ui padded grid ">

<div class="white four wide column"><i class="icon checkmark green"></i>Гарантия 12 месяцев</div>
<div class="white four wide column"> <i class="icon checkmark green"></i>Оплата после проверки </div>
<div class="white four wide column"> <i class="icon checkmark green"></i>Скидка 2р при самовывозе!</div>

</div> -->
     </div></div></div>`;
        //row.appendChild(description);
        document.querySelector(".des").appendChild(description);

        const buyModal = document.createElement("div");
        buyModal.className = "ui container buymodal";
        buyModal.innerHTML = `<div class="ui tiny modal" id="buy_buy${
          element.gsx$id.$t
        }"><i class="close icon"></i><div class="header">
        ${element.gsx$name.$t} - цена: ${element.gsx$price.$t} руб 
   
        <form class ="ui form" action="send.php" method="post">
        <div class="field">
        <label>Телефон</label>
        <input type="text" name="phone" placeholder="+375291325582">
       </div>
       <div class="field">
         <label>Адрес доставки</label>
         <textarea rows="2" placeholder="ул. Космонавтов 22, после 18. На ноутбук Asus VivoBook X540NA-GQ002" name="adress"></textarea>
       </div>
       <input type="hidden" name="tovar" value="зарядное устройство для ноутбука">
       <input type="hidden" name="forma" value="${element.gsx$name.$t}">
       <input type="hidden" name="price" value="${element.gsx$price.$t}">
       <input type="hidden" name="UTM" value="crm">
       <div class="ui toggle checkbox">
       <input type="checkbox" name="color" value="доставка +5р" id="dostavka_on">
       <label>Доставка 5р</label>
       </div> <br>
       <!-- <div class="ui toggle checkbox">
   
       <input type="checkbox" name="adress" value="самовывоз, скидка 2р" id="samovivoz_on">
       <label>Самовывоз (скидка 2р)</label>
       </div> -->
       <div class="center">
        <button class="ui button green" type="submit" id="sendform">Сделать заказ</button>
        </div>
        </form>
        </div>`;
        document.querySelector(".buymodal").appendChild(buyModal);
      }
    });
  }

  sendForm() {
    const sendform = document.createElement("div");
    sendform.className = "ui container sendform";
    sendform.innerHTML = `<div class="ui mini modal" id="send_sendform"><i class="close icon"></i><div class="header">
  Спасибо за заказ!
  </div>`;
    document.querySelector(".buymodal").appendChild(sendform);
  }
  sendQuestionForm() {
    const questionForm = document.createElement("div");
    questionForm.className = "ui container";
    questionForm.innerHTML = `<div class="ui tiny modal" id="question_send_order"><i class="close icon"></i><div class="header">
   Оставьте заявку! Обязательно поможем

    <form class ="ui form" action="send.php" method="post">
    <div class="field">
    <label>Телефон</label>
    <input type="text" name="phone" placeholder="+375291325582">
   </div>
   <div class="field">
     <label>Текст заявки</label>
     <textarea rows="2" placeholder="..."></textarea>
   </div>
   <input type="hidden" name="tovar" value="зарядное устройство для ноутбука">
   <input type="hidden" name="forma" value="форма заявки">
   <input type="hidden" name="price" value="--">
   <input type="hidden" name="UTM" value="crm">
   <!-- <div class="ui toggle checkbox">
   <input type="checkbox" name="adress" value="самовывоз, скидка 2р" id="samovivoz_on">
   <label>Самовывоз (скидка 2р)</label>
   </div> -->
   <div class="center">
    <button class="ui button green" type="submit" id="sendform">Оставить заявку</button>
    </div>
    </form>
    </div>`;
    document.querySelector(".questions").appendChild(questionForm);
  }

  renderQuestionForm(id) {
    $(`#question_${id}`)
      .modal({
        blurring: true
      })
      .modal("show");
  }

  renderSendForm(id) {
    $(`#send_${id}`)
      .modal({
        blurring: true
      })
      .modal("show");
  }
  renderDescription(id) {
    $(`#des_${id}`)
      .modal({
        blurring: true
      })
      .modal("show");
  }

  renderBuyWIndow(id) {
    $(`#buy_${id}`)
      .modal({
        blurring: true
      })
      .modal("show");
  }
}
let controller = new Controller();
let view = new View();
let model = new Model();
view.events();
view.getContent();
view.sendForm();
view.sendQuestionForm();
$(document).ready(function() {
  $(".ui.accordion").accordion();
});
