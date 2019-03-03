(function () {
  'use strict';

  var items = [
    {
      "id": "5c5e8a7a2f3a5e1f1851567c",
      "country": "Lebanon",
      "company": "Niquent"
    },
    {
      "id": "5c5e8a7a70fe49d933976468",
      "country": "Kazakhstan",
      "company": "Overfork"
    },
    {
      "id": "5c5e8a7a3bb73d3439a1dba1",
      "country": "Romania",
      "company": "Velity"
    },
    {
      "id": "5c5e8a7aa7569db3c39cba0f",
      "country": "Virgin Islands (British)",
      "company": "Zappix"
    },
    {
      "id": "5c5e8a7a39f278e86f59c188",
      "country": "Rwanda",
      "company": "Geekola"
    },
    {
      "id": "5c5e8a7aa8e9be4917f0b62d",
      "country": "Macau",
      "company": "Digitalus"
    },
    {
      "id": "5c5e8a7ad5f1f6da418e0abf",
      "country": "Greenland",
      "company": "Exerta"
    },
    {
      "id": "5c5e8a7ac75ae11816123a6d",
      "country": "Malaysia",
      "company": "Vicon"
    },
    {
      "id": "5c5e8a7a51af22b47ccd697a",
      "country": "Niger",
      "company": "Centree"
    },
    {
      "id": "5c5e8a7a3e9ffabf331c8870",
      "country": "Georgia",
      "company": "Dreamia"
    },
    {
      "id": "5c5e8a7a8559dc02ede848d5",
      "country": "South Africa",
      "company": "Pharmacon"
    },
    {
      "id": "5c5e8a7a07083fbafd80c234",
      "country": "Botswana",
      "company": "Quizka"
    },
    {
      "id": "5c5e8a7a9e16b65150aa2451",
      "country": "Moldova",
      "company": "Lyrichord"
    },
    {
      "id": "5c5e8a7a6076eabb76344575",
      "country": "Iceland",
      "company": "Microluxe"
    },
    {
      "id": "5c5e8a7ac2f9e97db5eb1624",
      "country": "Indonesia",
      "company": "Ovation"
    },
    {
      "id": "5c5e8a7a86ead2f0d57584a6",
      "country": "Canada",
      "company": "Isotrack"
    },
    {
      "id": "5c5e8a7a4c86b1e2b538a6a1",
      "country": "Madagascar",
      "company": "Manufact"
    },
    {
      "id": "5c5e8a7af91b464bf2dc5304",
      "country": "Lesotho",
      "company": "Slambda"
    },
    {
      "id": "5c5e8a7ab2fa08c11f4fd836",
      "country": "Switzerland",
      "company": "Ronbert"
    },
    {
      "id": "5c5e8a7a77f64b75c9010dad",
      "country": "Turkmenistan",
      "company": "Insuron"
    },
    {
      "id": "5c5e8a7a0a0faf680cde9ce1",
      "country": "Monaco",
      "company": "Ozean"
    },
    {
      "id": "5c5e8a7a74f435ed51dd31e1",
      "country": "India",
      "company": "Kaggle"
    },
    {
      "id": "5c5e8a7a97565bfa6deb1707",
      "country": "Saint Vincent and The Grenadines",
      "company": "Rameon"
    },
    {
      "id": "5c5e8a7a1bb1b9fcf1b9c508",
      "country": "French Guiana",
      "company": "Proxsoft"
    },
    {
      "id": "5c5e8a7a22e53dd7e8d9424a",
      "country": "Togo",
      "company": "Insurity"
    },
    {
      "id": "5c5e8a7a0eb849f704464e72",
      "country": "Greece",
      "company": "Melbacor"
    },
    {
      "id": "5c5e8a7a9e9894575d43b19a",
      "country": "Barbados",
      "company": "Supportal"
    },
    {
      "id": "5c5e8a7a92c3f2042fd1ad1e",
      "country": "New Zealand",
      "company": "Cemention"
    },
    {
      "id": "5c5e8a7a7c7ff41a92d60fb0",
      "country": "United Arab Emirates",
      "company": "Aquazure"
    },
    {
      "id": "5c5e8a7ab09146a9b437e091",
      "country": "San Marino",
      "company": "Zensor"
    },
    {
      "id": "5c5e8a7ab90313296f780d0e",
      "country": "Central African Republic",
      "company": "Rubadub"
    },
    {
      "id": "5c5e8a7a16132ddf8698b24b",
      "country": "Bolivia",
      "company": "Nurali"
    },
    {
      "id": "5c5e8a7a8e05215ca1c29a10",
      "country": "Pitcairn",
      "company": "Enersol"
    },
    {
      "id": "5c5e8a7a3f123000f579a70a",
      "country": "Libya",
      "company": "Brainquil"
    },
    {
      "id": "5c5e8a7ad206eeb755afb840",
      "country": "Vanuatu",
      "company": "Micronaut"
    },
    {
      "id": "5c5e8a7a4c20de26f20b58cd",
      "country": "Guyana",
      "company": "Nitracyr"
    },
    {
      "id": "5c5e8a7a3f66b4d90444860f",
      "country": "Laos",
      "company": "Homelux"
    },
    {
      "id": "5c5e8a7a86f1151c5c9bda49",
      "country": "Costa Rica",
      "company": "Rooforia"
    },
    {
      "id": "5c5e8a7a18d9a53ba931967f",
      "country": "Norway",
      "company": "Enaut"
    },
    {
      "id": "5c5e8a7adbc3dc45df347d32",
      "country": "Cocos (Keeling Islands)",
      "company": "Viagreat"
    },
    {
      "id": "5c5e8a7afae3924c74b83d57",
      "country": "Zaire",
      "company": "Digigene"
    },
    {
      "id": "5c5e8a7a2697aaa7f8e56db8",
      "country": "Comoros",
      "company": "Geeketron"
    },
    {
      "id": "5c5e8a7ac1777ba2c33d8536",
      "country": "Trinidad and Tobago",
      "company": "Freakin"
    },
    {
      "id": "5c5e8a7ab381642b992d8170",
      "country": "Yemen",
      "company": "Rodeomad"
    },
    {
      "id": "5c5e8a7a92c51636374c13ff",
      "country": "Cote D\"Ivoire (Ivory Coast)",
      "company": "Ziggles"
    },
    {
      "id": "5c5e8a7ae94e2afdbe7ee2a2",
      "country": "Swaziland",
      "company": "Knowlysis"
    },
    {
      "id": "5c5e8a7ae6d2a45480c0b916",
      "country": "Paraguay",
      "company": "Radiantix"
    },
    {
      "id": "5c5e8a7a02c21faa00c28265",
      "country": "Somalia",
      "company": "Roboid"
    },
    {
      "id": "5c5e8a7a85213e39be167068",
      "country": "Wallis and Futuna Islands",
      "company": "Goko"
    },
    {
      "id": "5c5e8a7a7b7a20148954db63",
      "country": "S. Georgia and S. Sandwich Isls.",
      "company": "Neurocell"
    },
    {
      "id": "5c5e8a7a1b1b70875109db9e",
      "country": "Uruguay",
      "company": "Orbalix"
    },
    {
      "id": "5c5e8a7a1c9c660277ecab61",
      "country": "Christmas Island",
      "company": "Accuprint"
    },
    {
      "id": "5c5e8a7a0580c3cf90c9176e",
      "country": "Marshall Islands",
      "company": "Netbook"
    },
    {
      "id": "5c5e8a7a115ad71af946a15c",
      "country": "Tonga",
      "company": "Urbanshee"
    },
    {
      "id": "5c5e8a7a540efa3c8443aacd",
      "country": "Benin",
      "company": "Capscreen"
    },
    {
      "id": "5c5e8a7aad585e91e2603f61",
      "country": "Tunisia",
      "company": "Greeker"
    },
    {
      "id": "5c5e8a7ab756e90095c85904",
      "country": "Australia",
      "company": "Gynko"
    },
    {
      "id": "5c5e8a7a58580673777b8475",
      "country": "Chile",
      "company": "Exoblue"
    },
    {
      "id": "5c5e8a7a7e7c51104d9a15bf",
      "country": "Saudi Arabia",
      "company": "Decratex"
    },
    {
      "id": "5c5e8a7a1fab8722d03fc42b",
      "country": "Cook Islands",
      "company": "Jimbies"
    },
    {
      "id": "5c5e8a7a597c8408ea16784e",
      "country": "Poland",
      "company": "Lumbrex"
    },
    {
      "id": "5c5e8a7a0f0f7efefb9fef61",
      "country": "Zimbabwe",
      "company": "Zinca"
    },
    {
      "id": "5c5e8a7acf6349ec096e163a",
      "country": "Bangladesh",
      "company": "Extragen"
    },
    {
      "id": "5c5e8a7a30bf2736dec06b7f",
      "country": "Mexico",
      "company": "Kraggle"
    },
    {
      "id": "5c5e8a7acee2cae7bb6bca70",
      "country": "Samoa",
      "company": "Geekmosis"
    },
    {
      "id": "5c5e8a7aa6ea6ad82c1e9732",
      "country": "Bhutan",
      "company": "Roughies"
    },
    {
      "id": "5c5e8a7a83627af50a3e30a5",
      "country": "Heard and McDonald Islands",
      "company": "Harmoney"
    },
    {
      "id": "5c5e8a7a5c2cdc1fbbae2f78",
      "country": "Montserrat",
      "company": "Ewaves"
    },
    {
      "id": "5c5e8a7a8ba072ff8bfd1359",
      "country": "Finland",
      "company": "Luxuria"
    },
    {
      "id": "5c5e8a7a08fc9329e9f17181",
      "country": "Ethiopia",
      "company": "Quintity"
    },
    {
      "id": "5c5e8a7a90f2a5545f22489c",
      "country": "Yugoslavia",
      "company": "Fossiel"
    },
    {
      "id": "5c5e8a7a91ca9e34c82f9361",
      "country": "Ireland",
      "company": "Xumonk"
    },
    {
      "id": "5c5e8a7a22ba5d611c5e055c",
      "country": "Faroe Islands",
      "company": "Sultrax"
    },
    {
      "id": "5c5e8a7a5e5e4300781a03d0",
      "country": "Luxembourg",
      "company": "Xelegyl"
    },
    {
      "id": "5c5e8a7afbeb72451100d4fa",
      "country": "Mayotte",
      "company": "Jetsilk"
    },
    {
      "id": "5c5e8a7a5816c76374779fbf",
      "country": "Jamaica",
      "company": "Powernet"
    },
    {
      "id": "5c5e8a7af99d832686eaabe0",
      "country": "Guinea-Bissau",
      "company": "Poochies"
    },
    {
      "id": "5c5e8a7a41f0e4051f37632e",
      "country": "Papua New Guinea",
      "company": "Wazzu"
    },
    {
      "id": "5c5e8a7af51106f95e2e3c33",
      "country": "France, Metropolitan",
      "company": "Cormoran"
    },
    {
      "id": "5c5e8a7add2e1e0280ad7872",
      "country": "Antarctica",
      "company": "Bitrex"
    },
    {
      "id": "5c5e8a7a9d5bc6a2dd7964d8",
      "country": "Ecuador",
      "company": "Retrack"
    },
    {
      "id": "5c5e8a7a2e5265865cb11c41",
      "country": "Brazil",
      "company": "Automon"
    },
    {
      "id": "5c5e8a7a19507941d540c979",
      "country": "Grenada",
      "company": "Netility"
    },
    {
      "id": "5c5e8a7a61e67540294f8383",
      "country": "Nicaragua",
      "company": "Mantrix"
    },
    {
      "id": "5c5e8a7a7d2b5b5d18aba9ec",
      "country": "Namibia",
      "company": "Exoplode"
    },
    {
      "id": "5c5e8a7a96a4b8954dc72292",
      "country": "Nepal",
      "company": "Omatom"
    },
    {
      "id": "5c5e8a7a01b5da654a234857",
      "country": "Bouvet Island",
      "company": "Gink"
    },
    {
      "id": "5c5e8a7a01c2f6860d6f5341",
      "country": "Bulgaria",
      "company": "Genesynk"
    },
    {
      "id": "5c5e8a7ad691330f44b0fe1b",
      "country": "Nauru",
      "company": "Lexicondo"
    },
    {
      "id": "5c5e8a7a4c3f52d0cb7c0a38",
      "country": "Belgium",
      "company": "Columella"
    },
    {
      "id": "5c5e8a7aac60d81ebbaa340d",
      "country": "Malta",
      "company": "Volax"
    },
    {
      "id": "5c5e8a7a5d66780abccabac5",
      "country": "Netherlands Antilles",
      "company": "Uni"
    },
    {
      "id": "5c5e8a7a5303cd0c981553b6",
      "country": "Tanzania",
      "company": "Ronelon"
    },
    {
      "id": "5c5e8a7a231d1c5fc4a461c1",
      "country": "Sri Lanka",
      "company": "Intradisk"
    },
    {
      "id": "5c5e8a7a27cc2f7b7809c38f",
      "country": "Gabon",
      "company": "Zosis"
    },
    {
      "id": "5c5e8a7aee0be392fc40eca8",
      "country": "Anguilla",
      "company": "Imaginart"
    },
    {
      "id": "5c5e8a7a983b83d488438e7b",
      "country": "Malawi",
      "company": "Applidec"
    },
    {
      "id": "5c5e8a7a9a90fccdbf6403f1",
      "country": "Armenia",
      "company": "Zillacom"
    },
    {
      "id": "5c5e8a7ad973665c0913518f",
      "country": "Kyrgyzstan",
      "company": "Zilidium"
    },
    {
      "id": "5c5e8a7a10d83cd255d0c487",
      "country": "France",
      "company": "Zidant"
    },
    {
      "id": "5c5e8a7a66ad65859aff5d34",
      "country": "Maldives",
      "company": "Geologix"
    },
    {
      "id": "5c5e8a7aa7df679649e42837",
      "country": "Liechtenstein",
      "company": "Furnigeer"
    },
    {
      "id": "5c5e8a7abde6d48c5e38276f",
      "country": "Slovenia",
      "company": "Brainclip"
    },
    {
      "id": "5c5e8a7aacba9f5f1f6e269e",
      "country": "Afghanistan",
      "company": "Quarx"
    },
    {
      "id": "5c5e8a7aebcf9d80af14089c",
      "country": "Korea (North)",
      "company": "Sportan"
    },
    {
      "id": "5c5e8a7a8454a2627f542f7c",
      "country": "Argentina",
      "company": "Zillactic"
    },
    {
      "id": "5c5e8a7a334fdf6e29200c1c",
      "country": "Kuwait",
      "company": "Escenta"
    },
    {
      "id": "5c5e8a7a07ae57d7903402b5",
      "country": "Hong Kong",
      "company": "Ebidco"
    },
    {
      "id": "5c5e8a7a49e3e4f2087e3f11",
      "country": "Germany",
      "company": "Phormula"
    },
    {
      "id": "5c5e8a7a169ef4af66134bd8",
      "country": "Viet Nam",
      "company": "Ultrimax"
    },
    {
      "id": "5c5e8a7a11b819f7ba32b0cb",
      "country": "Eritrea",
      "company": "Handshake"
    },
    {
      "id": "5c5e8a7a0d40d359b83c8a82",
      "country": "Cambodia",
      "company": "Billmed"
    },
    {
      "id": "5c5e8a7a449c44ee95dbd2d9",
      "country": "Honduras",
      "company": "Multron"
    },
    {
      "id": "5c5e8a7a5259c74390d4b04f",
      "country": "Mongolia",
      "company": "Digique"
    },
    {
      "id": "5c5e8a7ac85c178acac0067e",
      "country": "Mauritius",
      "company": "Tropoli"
    },
    {
      "id": "5c5e8a7a91744ba1d9ac65ea",
      "country": "Oman",
      "company": "Fiberox"
    },
    {
      "id": "5c5e8a7ad06db0914425d958",
      "country": "Senegal",
      "company": "Permadyne"
    },
    {
      "id": "5c5e8a7ae0b1a36abac1b336",
      "country": "Cayman Islands",
      "company": "Photobin"
    },
    {
      "id": "5c5e8a7ae1834ecef14c2236",
      "country": "Burundi",
      "company": "Elpro"
    },
    {
      "id": "5c5e8a7a516dd0e9619094f5",
      "country": "Chad",
      "company": "Equitax"
    },
    {
      "id": "5c5e8a7a8135b7356c3da7f9",
      "country": "British Indian Ocean Territory",
      "company": "Insuresys"
    },
    {
      "id": "5c5e8a7a2cf6822aecbb26b0",
      "country": "Panama",
      "company": "Viagrand"
    },
    {
      "id": "5c5e8a7a0bf96382eb66fbf8",
      "country": "Peru",
      "company": "Medcom"
    },
    {
      "id": "5c5e8a7a3dba9510c8d178c8",
      "country": "Puerto Rico",
      "company": "Updat"
    },
    {
      "id": "5c5e8a7a28a3d92c51084145",
      "country": "Philippines",
      "company": "Anacho"
    },
    {
      "id": "5c5e8a7a527178198599e5cc",
      "country": "Netherlands",
      "company": "Medesign"
    },
    {
      "id": "5c5e8a7aa258546302723e01",
      "country": "Tuvalu",
      "company": "Navir"
    },
    {
      "id": "5c5e8a7a4fd12080cb721ef1",
      "country": "Bosnia and Herzegovina",
      "company": "Datagene"
    },
    {
      "id": "5c5e8a7a702af5a79a738eaa",
      "country": "Tajikistan",
      "company": "Aquasseur"
    },
    {
      "id": "5c5e8a7a4d39ba8b2933a92a",
      "country": "American Samoa",
      "company": "Quility"
    },
    {
      "id": "5c5e8a7a24898cc76d14d5bd",
      "country": "Aruba",
      "company": "Caxt"
    },
    {
      "id": "5c5e8a7af8d2d0580c5a3f81",
      "country": "Jordan",
      "company": "Xyqag"
    },
    {
      "id": "5c5e8a7a4a5ad25b09cd7682",
      "country": "Guinea",
      "company": "Plasmox"
    },
    {
      "id": "5c5e8a7a4bba540729bad680",
      "country": "El Salvador",
      "company": "Gology"
    },
    {
      "id": "5c5e8a7a4bb95e7f4052d001",
      "country": "Micronesia",
      "company": "Dognost"
    },
    {
      "id": "5c5e8a7a6f528bd54a01fa36",
      "country": "Hungary",
      "company": "Vendblend"
    },
    {
      "id": "5c5e8a7a14989f8f9b749c9d",
      "country": "Suriname",
      "company": "Kineticut"
    },
    {
      "id": "5c5e8a7a444c7a0625214c51",
      "country": "Albania",
      "company": "Accupharm"
    },
    {
      "id": "5c5e8a7a8cdf19beb2a9cfbc",
      "country": "Angola",
      "company": "Junipoor"
    },
    {
      "id": "5c5e8a7ae178e62eead21f47",
      "country": "Russian Federation",
      "company": "Adornica"
    },
    {
      "id": "5c5e8a7a51cc583336522fb7",
      "country": "Czech Republic",
      "company": "Ginkogene"
    },
    {
      "id": "5c5e8a7aa52e7cdcd539a53f",
      "country": "Northern Mariana Islands",
      "company": "Zilencio"
    },
    {
      "id": "5c5e8a7a9f179a753f2ff1ae",
      "country": "Colombia",
      "company": "Zork"
    },
    {
      "id": "5c5e8a7af643299edb58b962",
      "country": "Denmark",
      "company": "Geekfarm"
    },
    {
      "id": "5c5e8a7a9e9dc22b8d1789f2",
      "country": "Western Sahara",
      "company": "Anixang"
    },
    {
      "id": "5c5e8a7ac23315f30f709ee7",
      "country": "Djibouti",
      "company": "Franscene"
    },
    {
      "id": "5c5e8a7a312ffa797048579f",
      "country": "Ghana",
      "company": "Orbaxter"
    },
    {
      "id": "5c5e8a7a4599ec43db46a751",
      "country": "Saint Lucia",
      "company": "Extragene"
    },
    {
      "id": "5c5e8a7a08eb7ea13f5425a5",
      "country": "Japan",
      "company": "Opportech"
    },
    {
      "id": "5c5e8a7af935c808e294e51f",
      "country": "Martinique",
      "company": "Gluid"
    },
    {
      "id": "5c5e8a7aa8e4d11af547cdc1",
      "country": "Cape Verde",
      "company": "Fuelworks"
    },
    {
      "id": "5c5e8a7a311fd539e67357f5",
      "country": "Iran",
      "company": "Mangelica"
    },
    {
      "id": "5c5e8a7a11737d4a7a4d1687",
      "country": "Myanmar",
      "company": "Xleen"
    },
    {
      "id": "5c5e8a7a9200bf9a493c8c54",
      "country": "New Caledonia",
      "company": "Enjola"
    },
    {
      "id": "5c5e8a7af228f477631b1c8d",
      "country": "Gambia",
      "company": "Glasstep"
    },
    {
      "id": "5c5e8a7a4f2a084c618865b1",
      "country": "Algeria",
      "company": "Talae"
    },
    {
      "id": "5c5e8a7ae042fb63b5ee00ac",
      "country": "Ukraine",
      "company": "Velos"
    },
    {
      "id": "5c5e8a7affe1a77fecce91bd",
      "country": "Slovak Republic",
      "company": "Talkola"
    },
    {
      "id": "5c5e8a7aef3b66b1f7d978b8",
      "country": "Vatican City State (Holy See)",
      "company": "Pigzart"
    },
    {
      "id": "5c5e8a7a16d58713eb246d7c",
      "country": "Norfolk Island",
      "company": "Candecor"
    },
    {
      "id": "5c5e8a7a5cccdd053b55505e",
      "country": "Brunei Darussalam",
      "company": "Suretech"
    },
    {
      "id": "5c5e8a7ab5dd902cb7fc4009",
      "country": "Bahamas",
      "company": "Lingoage"
    },
    {
      "id": "5c5e8a7ad69789d2e606f3bc",
      "country": "Macedonia",
      "company": "Aquafire"
    },
    {
      "id": "5c5e8a7a796d7070c30c9094",
      "country": "Congo",
      "company": "Gynk"
    },
    {
      "id": "5c5e8a7ab6e2ff10054d5f08",
      "country": "Mauritania",
      "company": "Gonkle"
    },
    {
      "id": "5c5e8a7a3f029609407cef85",
      "country": "Saint Kitts and Nevis",
      "company": "Sustenza"
    },
    {
      "id": "5c5e8a7a9f3ffa4aea9786f2",
      "country": "Svalbard and Jan Mayen Islands",
      "company": "Songbird"
    },
    {
      "id": "5c5e8a7ac4294d05f80020b8",
      "country": "Gibraltar",
      "company": "Insectus"
    },
    {
      "id": "5c5e8a7acbd66d9520e473c8",
      "country": "St. Pierre and Miquelon",
      "company": "Quilch"
    },
    {
      "id": "5c5e8a7a48e4e93966f30d2d",
      "country": "Azerbaijan",
      "company": "Datacator"
    },
    {
      "id": "5c5e8a7a997b60384d6688a3",
      "country": "US Minor Outlying Islands",
      "company": "Exovent"
    },
    {
      "id": "5c5e8a7a79bab7c98695b710",
      "country": "Portugal",
      "company": "Rotodyne"
    },
    {
      "id": "5c5e8a7a51d44cfd53abd5c8",
      "country": "Dominican Republic",
      "company": "Qot"
    },
    {
      "id": "5c5e8a7adc095584c2e68ea4",
      "country": "Dominica",
      "company": "Atomica"
    },
    {
      "id": "5c5e8a7a439ccb8615525677",
      "country": "Fiji",
      "company": "Menbrain"
    },
    {
      "id": "5c5e8a7ab6814b28296b4f22",
      "country": "Virgin Islands (US)",
      "company": "Xeronk"
    },
    {
      "id": "5c5e8a7a12cddec65ee50963",
      "country": "Turkey",
      "company": "Newcube"
    },
    {
      "id": "5c5e8a7a67d3138e246322ba",
      "country": "Latvia",
      "company": "Genmy"
    },
    {
      "id": "5c5e8a7a970c0a16a7933a4f",
      "country": "Guadeloupe",
      "company": "Pholio"
    },
    {
      "id": "5c5e8a7a269bed6c6a1cabc8",
      "country": "Burkina Faso",
      "company": "Filodyne"
    },
    {
      "id": "5c5e8a7aa238beaf49083d0b",
      "country": "Palau",
      "company": "Signidyne"
    },
    {
      "id": "5c5e8a7af9bae6bc907b8950",
      "country": "Singapore",
      "company": "Tellifly"
    },
    {
      "id": "5c5e8a7a634b74600b2a8189",
      "country": "Sierra Leone",
      "company": "Zillar"
    },
    {
      "id": "5c5e8a7aa6906eb1a36b58b7",
      "country": "Estonia",
      "company": "Opticon"
    },
    {
      "id": "5c5e8a7ad27f86859d2034d4",
      "country": "Austria",
      "company": "Plasmos"
    },
    {
      "id": "5c5e8a7aa91a6ed55fce228d",
      "country": "Spain",
      "company": "Ovium"
    },
    {
      "id": "5c5e8a7a7cc42a4e2fa2b9d6",
      "country": "Equatorial Guinea",
      "company": "Quinex"
    },
    {
      "id": "5c5e8a7a75cac22f44b47cf8",
      "country": "Belarus",
      "company": "Mantro"
    },
    {
      "id": "5c5e8a7a9edaa08adfa6f69d",
      "country": "Guatemala",
      "company": "Voipa"
    },
    {
      "id": "5c5e8a7a4c11f883c2f5e210",
      "country": "Antigua and Barbuda",
      "company": "Ecraze"
    },
    {
      "id": "5c5e8a7a74d72a497c8485b3",
      "country": "United Kingdom",
      "company": "Comtrak"
    },
    {
      "id": "5c5e8a7ae383f56e0499bd5f",
      "country": "Seychelles",
      "company": "Waab"
    },
    {
      "id": "5c5e8a7a46356cedc261532d",
      "country": "Sao Tome and Principe",
      "company": "Geekus"
    },
    {
      "id": "5c5e8a7a6ff5a73071d4b526",
      "country": "China",
      "company": "Papricut"
    },
    {
      "id": "5c5e8a7a5da5e3821d3f31b8",
      "country": "Iraq",
      "company": "Pathways"
    },
    {
      "id": "5c5e8a7a09cebe021082d076",
      "country": "Niue",
      "company": "Solaren"
    },
    {
      "id": "5c5e8a7a32402f1244395346",
      "country": "Egypt",
      "company": "Qiao"
    },
    {
      "id": "5c5e8a7a7055ec1d364e1612",
      "country": "Taiwan",
      "company": "Sultraxin"
    },
    {
      "id": "5c5e8a7a98c749402e19e01b",
      "country": "French Polynesia",
      "company": "Zaya"
    },
    {
      "id": "5c5e8a7a2533e248ca333c74",
      "country": "Mali",
      "company": "Orbiflex"
    },
    {
      "id": "5c5e8a7a321e4ffce41c0a9c",
      "country": "St. Helena",
      "company": "Straloy"
    },
    {
      "id": "5c5e8a7a9b99db681c2b011c",
      "country": "Pakistan",
      "company": "Zensure"
    },
    {
      "id": "5c5e8a7a1beaadcedcee8cd8",
      "country": "Uganda",
      "company": "Letpro"
    },
    {
      "id": "5c5e8a7a5cbb3a15e0dce625",
      "country": "Sweden",
      "company": "Techade"
    },
    {
      "id": "5c5e8a7ac80c601b0768dbe8",
      "country": "Israel",
      "company": "Earthplex"
    }
  ]
  ;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var DSAutocomplete =
  /*#__PURE__*/
  function () {
    /**
     * Search result item
     * @typedef {(Object|String)} DSASearchResultsItem
     */

    /**
     * Generate search results item template
     * @callback DSASearchResultsItemTemplateGenerator
     * @param {DSASearchResultsItem} item - Item data
     * @param {DSAConfig} config - Plugin config
     * @return {HTMLElement} Search result item template
     */

    /**
     * Generate search results template
     * @callback DSASearchResultsTemplateGenerator
     * @param {DSAConfig} config - Plugin config
     * @return {HTMLElement} Search results template
     */

    /**
     * Search results callback
     * @callback DSASearchResultsCallback
     * @param {String} query - Search query
     * @return {DSASearchResultsSource}
     */

    /**
     * Search results
     * @typedef {(Array<DSASearchResultsItem>|Object|Promise|DSASearchResultsCallback)} DSASearchResultsSource
     */

    /**
     * Autocomplete config
     * @typedef {Object} DSAConfig
     * @property {String} itemValuePropertyName - The name of the property, the value of which will be used as label
     * @property {Number} minCharactersForSearch - Minimal required amount of characters in input, required for search
     * @peropty {(DSASearchResultsSource)} items - Search source or search results itself
     */

    /**
     * Autocomplete constructor
     * @constructor
     * @param {HTMLInputElement} element HTML input element
     * @param {DSAConfig} config Plugin config
     * @param {DSAKeyboardConfig} keyboardConfig Plugin keyboard options
     */
    function DSAutocomplete(element, config) {
      var keyboardConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, DSAutocomplete);
      /**
       * Autocomplete config
       * @public
       * @typedef {Object} DSAConfig
       * @property {(DSASearchResultsSource)} items - Search source or search results itself
       * @property {Boolean} showResultsOnFocus - If true, search results (if exists) will be shown on focus
       * @property {String} itemValuePropertyName - The name of the property, the value of which will be used as label
       * @property {Number} minCharactersForSearch - Minimal required amount of characters in input, required for search
       * @property {DSASearchResultsItemTemplateGenerator} itemTemplate - Item custom template generator
       * @property {DSASearchResultsTemplateGenerator} resultsTemplate - Custom search results template generator
       * @property {String} itemClass - Class to be added for each search result item
       * @property {String} resultsClass - Class to be added to the search results container
       * @property {String} itemFocusedClass - Class to be added to the search result item when focused
       * @property {String} inputFocusedClass - Class to be added to the search input when focused
       * @property {String} resultsHiddenClass - Class to be added to the search results container when hidden
       */


      this.defaultConfig = {
        items: [],
        showResultsOnFocus: false,
        itemValuePropertyName: 'name',
        minCharactersForSearch: 3,
        itemTemplate: this.buildSearchItemTemplate,
        resultsTemplate: this.buildSearchResultsTemplate,
        itemClass: 'autocomplete__result',
        resultsClass: 'autocomplete__results',
        itemFocusedClass: 'autocomplete__result_focused',
        inputFocusedClass: 'autocomplete__input_focused',
        resultsHiddenClass: 'autocomplete__results_hidden'
        /**
         * Actual plugin config
         * @public
         * @type {DSAConfig}
         */

      };
      this.config = Object.assign(this.defaultConfig, config);
      /**
       * Plugin elements
       * @private
       * @typedef {Object} DSAElements
       * @property {HTMLInputElement} input - HTML input
       * @property {HTMLElement} results - HTML element for search results
       */

      this.elements = {
        input: element,
        results: this.getSearchResultsContainer()
        /**
         * Plugin state values
         * @private
         * @typedef {Object} DSAState
         * @property {String} query - Search query
         * @property {Array} results - Search results
         * @property {Boolean} focused - Indicates, if autocomplete input is focused
         * @property {Number} debounce - ID value of the timer that is set
         * @property {Number} focusedResult - Currently focused element index
         * @property {(Object|String)} selectedElement - Currently selected item
         * @property {Number} highlightedElement - Index of currently highlighted element
         */

      };
      this.state = {
        query: '',
        results: [],
        focused: false,
        debounce: 0,
        focusedResult: null,
        selectedElement: null,
        highlightedElement: null
        /**
         * Plugin keyboard settings
         * @public
         * @typedef {Object} DSAKeyboardConfig
         * @property {Number[]} cancel - Keys used for hide search results without selecting currently highlighted item
         * @property {Number[]} select - Keys used for selection currently highlighted item
         * @property {Number[]} ignored - Keys, which are should not fire search results refetching
         * @property {Number[]} up - Keys used to navigate to the up on the search results
         * @property {Number[]} down - Keys used to navigate to the down on the search results
         * @property {Number[]} prevent - Keys should be prevented on search results selection
         */

      };
      this.defaultKeyboardConfig = {
        cancel: [27],
        select: [9, 13],
        ignored: [37, 39, 38, 40, 13, 27, 16, 9, 17, 18],
        up: [38],
        down: [40],
        prevent: [9, 13]
        /**
         * Actual plugin config
         * @public
         * @type {DSAKeyboardConfig}
         */

      };
      this.keyboard = Object.assign(this.defaultKeyboardConfig, keyboardConfig);
      this.init();
    }
    /**
     * Initiate plugin
     * @public
     */


    _createClass(DSAutocomplete, [{
      key: "init",
      value: function init() {
        if (!this.getSearchResultsContainer()) {
          this.attachSearchResultsContainer(this.config.resultsTemplate(this.config));
        }

        this.addEventListeners();
      }
      /**
       * Set search input focused state
       * Attaches classes to the search input and hides results depending on the
       * value passed in
       * @param {Boolean} value True for focused state and false for blur
       */

    }, {
      key: "setFocused",
      value: function setFocused(value) {
        this.elements.input.classList.toggle(this.config.inputFocusedClass, value);

        if (!value) {
          this.hideResults();
        }

        this.state.focused = value;
      }
      /**
       * Attach search results container to the component
       */

    }, {
      key: "attachSearchResultsContainer",
      value: function attachSearchResultsContainer(el) {
        document.body.append(el);
        this.elements.results = el;
        this.elements.results.style.position = 'absolute';
      }
      /**
       * Returns search results container element
       * @return {HTMLElement}
       */

    }, {
      key: "getSearchResultsContainer",
      value: function getSearchResultsContainer() {
        return document.querySelector('.' + this.config.resultsClass);
      }
      /**
       * Attach event listeners
       */

    }, {
      key: "addEventListeners",
      value: function addEventListeners() {
        var _this = this;

        this.elements.input.addEventListener('blur', function (e) {
          return _this.handleBlur(e);
        });
        this.elements.input.addEventListener('focus', function () {
          return _this.handleFocus();
        });
        this.elements.input.addEventListener('keyup', function (e) {
          return _this.handleKeyUpOnInput(e);
        });
        this.elements.input.addEventListener('keydown', function (e) {
          return _this.handleKeyDownOnInput(e);
        });

        if (!window.autocompleteEventListenersAdded) {
          window.addEventListener('click', function (e) {
            return _this.handleClickOnDocument(e);
          });
          window.autocompleteEventListenersAdded = true;
        }

        window.addEventListener('resize', function () {
          return _this.handleResize();
        });
        window.addEventListener('scroll', function () {
          return _this.handleResize();
        });
        window.addEventListener('orientationchange', function () {
          return _this.handleResize();
        });
      }
      /**
       * Handle screen size changes
       */

    }, {
      key: "handleResize",
      value: function handleResize() {
        if (this.isInputFocused() && this.isResultsVisible()) {
          this.updateResultsPosition();
        }
      }
      /**
       * Handle case, when search input lost focus
       * @param  {FocusEvent} e - Focus event
       */

    }, {
      key: "handleBlur",
      value: function handleBlur(e) {
        // noinspection JSUnresolvedVariable
        if (!e.relatedTarget || !e.relatedTarget.classList.contains(this.config.resultsClass)) {
          this.setFocused(false);
        }
      }
      /**
       * Handle case, when the search input got focus
       */

    }, {
      key: "handleFocus",
      value: function handleFocus() {
        if (this.state.results && this.state.results.length && this.config.showResultsOnFocus) {
          this.showResults(true);
        }
      }
      /**
       * Handle key up on the search input
       * @param  {KeyboardEvent} e - Keyboard event
       */

    }, {
      key: "handleKeyUpOnInput",
      value: function handleKeyUpOnInput(e) {
        var activeKey = this.getKeyCodeFromEvent(e);

        if (!e.ctrlKey && !this.isIgnoredKey(activeKey) && !(e.shiftKey && this.isIgnoredKey(activeKey))) {
          this.setFocused(true);
          this.state.query = this.elements.input.value;
          this.updateResults();
        }
      }
      /**
       * Check if passed keycode should be ignored (key is in the ignored array or reserved by the plugin)
       * @param {Number} keyCode - Key code
       * @return {Boolean} - True if key is ignored, false otehrwise
       */

    }, {
      key: "isIgnoredKey",
      value: function isIgnoredKey(keyCode) {
        return this.keyboard.ignored.indexOf(keyCode) >= 0 || this.keyboard.cancel.indexOf(keyCode) >= 0 || this.keyboard.down.indexOf(keyCode) >= 0 || this.keyboard.up.indexOf(keyCode) >= 0;
      }
      /**
       * Check, if event is about navigation key pressed.
       * @param  {Number} keyCode - Keyboard event
       * @return {Boolean} - True if is navigation key, false otherwise
       */

    }, {
      key: "isNavigationKey",
      value: function isNavigationKey(keyCode) {
        return this.keyboard.up.indexOf(keyCode) >= 0 || this.keyboard.down.indexOf(keyCode) >= 0;
      }
      /**
       * Check, if results container is visible or not
       * @return {boolean} - True if results container is visible, false otherwise
       */

    }, {
      key: "isResultsVisible",
      value: function isResultsVisible() {
        return this.elements.results.classList.contains(this.config.resultsHiddenClass);
      }
      /**
       * Handle keydown on the search input
       * @param  {KeyboardEvent} e - Keyboard event
       */

    }, {
      key: "handleKeyDownOnInput",
      value: function handleKeyDownOnInput(e) {
        var key = this.getKeyCodeFromEvent(e);

        if (this.keyboard.select.indexOf(key) >= 0 && this.state.selectedElement >= 0 && !this.isResultsVisible() && this.state.results[this.state.focusedResult]) {
          if (this.keyboard.prevent.indexOf(key) >= 0) {
            e.preventDefault();
          }

          this.selectFocusedItem();
        } else if (this.isNavigationKey(key)) {
          e.preventDefault();

          if (!this.state.results.length) {
            return;
          }

          if (this.state.focusedResult === null) {
            this.state.focusedResult = 0;
          } else {
            if (this.keyboard.up.indexOf(key) >= 0) {
              this.state.focusedResult -= 1;
            } else if (this.keyboard.down.indexOf(key) >= 0) {
              this.state.focusedResult += 1;
            }

            if (this.state.focusedResult >= this.state.results.length) {
              this.state.focusedResult = 0;
            } else if (this.state.focusedResult < 0) {
              this.state.focusedResult = this.state.results.length - 1;
            }
          }

          this.showResults();
        }

        if (this.isCancelKey(key) || this.keyboard.select.indexOf(key) >= 0) {
          this.hideResults();
        }
      }
      /**
       * Check if is "cancel" action key
       * @param {Number} keyCode - Key code
       * @return {Boolean} - True if is "cancel" key, false otherwise
       */

    }, {
      key: "isCancelKey",
      value: function isCancelKey(keyCode) {
        return this.keyboard.cancel.indexOf(keyCode) >= 0;
      }
      /**
       * Check, if input is focused or not
       * @return {boolean} - True, if input focused, false otherwise
       */

    }, {
      key: "isInputFocused",
      value: function isInputFocused() {
        return this.elements.input.classList.contains(this.config.inputFocusedClass);
      }
      /**
       * Handle click on the document
       * @param {Event} e - Mouse event
       */

    }, {
      key: "handleClickOnDocument",
      value: function handleClickOnDocument(e) {
        // noinspection JSUnresolvedVariable
        if (e.target.className.indexOf('autocomplete') < 0) {
          this.hideResults();
          this.setFocused(false);
        }
      }
      /**
       * Update search results
       */

    }, {
      key: "updateResults",
      value: function updateResults() {
        if (this.state.query.length >= this.config.minCharactersForSearch) {
          this.searchResults(this.state.query, this.config.items);
        } else {
          this.hideResults();
        }
      }
      /**
       * Hide search results container
       */

    }, {
      key: "hideResults",
      value: function hideResults() {
        this.elements.results.classList.add('autocomplete__results_hidden');
      }
      /**
       * Show search results container
       * @param {Boolean} [force=false] Forced value
       */

    }, {
      key: "showResults",
      value: function showResults() {
        var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (force) {
          this.elements.input.classList.add(this.config.inputFocusedClass);
        }

        if (this.isInputFocused()) {
          this.elements.results.innerHTML = '';
          this.elements.results.appendChild(this.getResultsElements());
          this.elements.results.classList.remove(this.config.resultsHiddenClass);
          this.updateResultsPosition();
        }
      }
      /**
       * Generates search results item html element
       * @param {DSASearchResultsItem} itemData - Search results item data
       * @param {DSAConfig} config - DS Autocomplete config
       * @return {HTMLElement} - Search results item html element
       */

    }, {
      key: "buildSearchItemTemplate",
      value: function buildSearchItemTemplate(itemData, config) {
        var itemElement = document.createElement('div');
        itemElement.className = config.itemClass;
        itemElement.innerText = itemData instanceof Object ? itemData[config.itemValuePropertyName] : itemData;
        return itemElement;
      }
      /**
       * Generates search results container element
       * @return {HTMLElement} - Search results container
       */

    }, {
      key: "buildSearchResultsTemplate",
      value: function buildSearchResultsTemplate(config) {
        var searchResultsElement = document.createElement('div');
        searchResultsElement.className = config.resultsClass;
        return searchResultsElement;
      }
      /**
       * Builds and returns a DocumentFragment with search results elements
       * @return {DocumentFragment} - Search results document fragment
       */

    }, {
      key: "getResultsElements",
      value: function getResultsElements() {
        var _this2 = this;

        var documentFragment = document.createDocumentFragment();
        this.state.results.forEach(function (item, index) {
          var searchResultsElement = _this2.config.itemTemplate(item, _this2.config);

          if (index === _this2.state.focusedResult) {
            searchResultsElement.classList.add(_this2.config.itemFocusedClass);
          }

          documentFragment.appendChild(searchResultsElement);
          searchResultsElement.addEventListener('click', function () {
            _this2.state.focusedResult = index;

            _this2.selectFocusedItem();

            _this2.hideResults();
          });
        });
        return documentFragment;
      }
    }, {
      key: "selectFocusedItem",
      value: function selectFocusedItem() {
        var selectedItem = this.state.results[this.state.focusedResult];

        if (selectedItem instanceof Object) {
          selectedItem = selectedItem[this.config.itemValuePropertyName];
        }

        this.elements.input.value = selectedItem;
      }
      /**
       * Updates search results container position
       */

    }, {
      key: "updateResultsPosition",
      value: function updateResultsPosition() {
        var autocompleteBounds = this.elements.input.getBoundingClientRect();
        this.elements.results.style.top = autocompleteBounds.bottom + document.documentElement.scrollTop + 'px';
        this.elements.results.style.left = autocompleteBounds.left + 'px';
        this.elements.results.style.width = autocompleteBounds.width + 'px';
        this.elements.results.setAttribute('tabindex', '-1');
      }
      /**
       * Builtin search function.
       * May be overrided by custom user function
       * @param  {String} query Search query
       * @param  {Array} items Search source
       * @return {Array} Search results
       */

    }, {
      key: "builtInSearchFunction",
      value: function builtInSearchFunction(query, items) {
        var _this3 = this;

        return items.filter(function (item) {
          return item[_this3.config.itemValuePropertyName].toLowerCase().indexOf(query.toLowerCase()) !== 0;
        });
      }
      /**
       * Show loading message
       */

    }, {
      key: "showLoading",
      value: function showLoading() {
        if (!this.state.focused) {
          return;
        }

        this.elements.results.innerHTML = '';
        var fragment = document.createDocumentFragment();
        var message = document.createElement('div');
        message.className = 'autocomplete__loader';
        message.innerText = 'Loading...';
        fragment.appendChild(message);
        this.updateResultsPosition();
        this.elements.results.appendChild(fragment);
        this.elements.results.classList.remove(this.config.resultsHiddenClass);
      }
      /**
       * Search results for given query
       * Shows loading message while searching results
       * Shows results (or no results message) when done
       * @param  {String} query Search query
       * @param  {(Function|Object|Array|Promise)} items Search source
       */

    }, {
      key: "searchResults",
      value: function searchResults(query, items) {
        var _this4 = this;

        this.state.focusedResult = null;
        clearTimeout(this.state.debounce);
        this.state.debounce = setTimeout(function () {
          var jailedDebounceValue = _this4.state.debounce;

          var result = _this4.getSearchResultsFromSource(query, items);

          _this4.showLoading();

          result.then(function (data) {
            _this4.state.results = data;
          }).catch(function () {
            _this4.state.results = [];
          }).finally(function () {
            if (jailedDebounceValue === _this4.state.debounce) {
              console.log('shown');

              _this4.showResults();
            } else {
              _this4.showLoading();
            }
          });
        }, 200);
      }
      /**
       * Get search results from given source.
       * Returns Promise, what should be resolved with array of results on success
       * @param  {String} query - Search query
       * @param  {(DSASearchResultsSource|DSASearchResultsCallback)} src - Search source
       * @return {Promise} - Search results promise
       */

    }, {
      key: "getSearchResultsFromSource",
      value: function getSearchResultsFromSource(query, src) {
        var result = src;

        if (typeof result === 'function') {
          result = result(query);
        }

        if (result instanceof Promise) {
          return result;
        } else if (result instanceof Object) {
          result = Object.values(result);
        }

        return new Promise(function (resolve, reject) {
          if (result instanceof Array) {
            resolve(result);
          } else {
            reject(new TypeError('Search results is not an array'));
          }
        });
      }
      /**
       * Get event key code
       * @param {(KeyboardEvent|MouseEvent)} e
       * @return {Number}
       */

    }, {
      key: "getKeyCodeFromEvent",
      value: function getKeyCodeFromEvent(e) {
        var code;

        if (typeof e.which !== 'undefined') {
          code = e.which;
        } else {
          // noinspection JSDeprecatedSymbols
          code = e.keyCode;
        }

        return code;
      }
    }]);

    return DSAutocomplete;
  }(); // noinspection JSUnusedGlobalSymbols

  /** @type {Array} */
  /* eslint-env browser */

  /* eslint-disable no-new */

  var itemsPA = ['one', 'two', 'three'];
  var autocompletePAInput = document.querySelector('#autocomplete-plain-array');
  new DSAutocomplete(autocompletePAInput, {
    items: itemsPA
  });
  var autocompleteOAInput = document.querySelector('#autocomplete-objects-array');
  new DSAutocomplete(autocompleteOAInput, {
    items: items,
    itemValuePropertyName: 'country'
  });
  var itemsO = {};
  items.forEach(function (item) {
    itemsO[item.country] = item;
  });
  var autocompleteOInput = document.querySelector('#autocomplete-object');
  new DSAutocomplete(autocompleteOInput, {
    items: itemsO,
    itemValuePropertyName: 'country'
  });

  var itemsF = function itemsF() {
    return ['one', 'two', 'three'];
  };

  var itemsP = function itemsP(query) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://api.github.com/search/repositories?q=' + query);

      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText).items);
        } else {
          reject(new Error('Request failed'));
        }
      };

      xhr.send();
    });
  };

  var autocompleteFInput = document.querySelector('#autocomplete-function');
  new DSAutocomplete(autocompleteFInput, {
    items: itemsF
  });
  var autocompletePInput = document.querySelector('#autocomplete-promise');
  new DSAutocomplete(autocompletePInput, {
    items: itemsP
  });

}());
