const app = Vue.createApp({
  data() {
    return {
      pracownicy: [{
          "imie": "Jan",
          "nazwisko": "Kowalski",
          "dzial": "IT",
          "wynagrodzenieKwota": "3000",
          "wynagrodzenieWaluta": "PLN",
          isVisible: true
        },
        {
          "imie": "Anna",
          "nazwisko": "Bąk",
          "dzial": "Administracja",
          "wynagrodzenieKwota": "2400.50",
          "wynagrodzenieWaluta": "PLN",
          isVisible: true
        },
        {
          "imie": "Paweł",
          "nazwisko": "Zabłocki",
          "dzial": "IT",
          "wynagrodzenieKwota": "3300",
          "wynagrodzenieWaluta": "PLN",
          isVisible: true
        },
        {
          "imie": "Tomasz",
          "nazwisko": "Osiecki",
          "dzial": "Administracja",
          "wynagrodzenieKwota": "2100",
          "wynagrodzenieWaluta": "PLN",
          isVisible: true
        },
        {
          "imie": "Iwona",
          "nazwisko": "Leihs-Gutowska",
          "dzial": "Handlowiec",
          "wynagrodzenieKwota": "3100",
          "wynagrodzenieWaluta": "PLN",
          isVisible: true
        }
      ],

      dzialy: [],
      suma: 0,
      search: '',
      checkedBox: [],
      fromCost: '',
      toCost: '',
      newPerson: {},
    };
  },
  computed: {


    // filteredPerson() {

    //   return this.pracownicy.filter((pracownik) => {
    //     if(pracownik.imie.match(this.search) || pracownik.nazwisko.match(this.search) ) {
    //       return true;
    //     } else return false;    
  },
  created() {

    this.dzialy = Array.from(new Set(this.pracownicy.map(item => item.dzial)));

  },
  methods: {


    selectDzial(event) {
      let dzial = event.target.value;
      let sum = 0;
      this.pracownicy.forEach(pracownik => {
        if (pracownik.dzial === dzial) {

          sum += Number(pracownik.wynagrodzenieKwota);
        }
      });
      if (isNaN(sum) == false) {
        this.suma = sum;
      } else {
        this.suma = 'Wystąpił Błąd';
      }

    },
    filteredPerson() {
      this.pracownicy.forEach(pracownik => {
        if (pracownik.imie.match(this.search) || pracownik.nazwisko.match(this.search)) {
          pracownik.isVisible = true;

        } else {
          pracownik.isVisible = false;
        }
      })
    },
    filteredBox() {

      this.pracownicy.forEach(pracownik => {

        if (this.checkedBox.includes(pracownik.dzial)) {
          pracownik.isVisible = true;
        } else if (this.checkedBox.length == 0) {
          pracownik.isVisible = true;
        } else {
          pracownik.isVisible = false;
        }
      })
    },
    filteredCost() {
      this.pracownicy.forEach(pracownik => {
        if (pracownik.wynagrodzenieKwota >= this.fromCost && pracownik.wynagrodzenieKwota <= this.toCost) {
          pracownik.isVisible = true;
        } else if(this.fromCost == '' || this.toCost == '') {
          pracownik.isVisible = true;
        } else {
          pracownik.isVisible = false;
        }
      })

    },

    showSum() {
      let 
        calaSuma = 0;
        waluta = '';
      this.pracownicy.forEach(pracownik => {
        
          calaSuma += Number(pracownik.wynagrodzenieKwota);
          waluta = 'PLN'     
      });
      return calaSuma ;

    },
    addPerson() {
      if(Object.keys(this.newPerson).length == 5) {
        this.newPerson.isVisible = true;
        this.pracownicy.push(this.newPerson);
        this.dzialy = Array.from(new Set(this.pracownicy.map(item => item.dzial)));
        this.newPerson = '';
      } 
      
    },
  }
}).mount('#app');