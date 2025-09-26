import { http, HttpResponse } from "msw";

export const plantHandlers = [
  http.get("http://localhost:8080/api/my-digital-garden", () => {
    return HttpResponse.json([
      {
        id: 1,
        image:
          "https://media.istockphoto.com/id/155352084/fr/photo/philodendron.jpg?s=2048x2048&w=is&k=20&c=kp4G7xpgzSEWw_OKdV3Ze1S2b3x9gSdRwK12YbURzOg=",
        commonName: "False philodendron",
        scientificName: "Monstera deliciosa",
        lastWatering: "19/09/2025",
        nextWatering: "26/09/2025",
      },
      {
        id: 2,
        image:
          "https://media.istockphoto.com/id/1380361370/fr/photo/bananier-d%C3%A9coratif-en-vase-en-b%C3%A9ton-isol%C3%A9-sur-fond-blanc.jpg?s=2048x2048&w=is&k=20&c=KLAiS7Ao-ncYsjVXyiw9JUVWK8QEk-pIWySsG_H278Q=",
        commonName: "Banana tree",
        scientificName: "Musa",
        lastWatering: "23/09/2025",
        nextWatering: "26/09/2025",
      },
      {
        id: 3,
        image:
          "https://media.istockphoto.com/id/626099106/fr/photo/feuille-verte-sur-fond-isol%C3%A9-photo-avec-trac%C3%A9-de-d%C3%A9tourage.jpg?s=2048x2048&w=is&k=20&c=RoZ_M0HkMseUHhsR1Hm95AfceTiXOuBtvwn25uSzKhg=",
        commonName: "Peperomia",
        scientificName: "Peperomia rotundifolia",
        lastWatering: "23/09/2025",
        nextWatering: "26/09/2025",
      },
      {
        id: 4,
        image:
          "https://media.istockphoto.com/id/1294242954/fr/photo/soleil-sur-le-ficus-elastica-en-pot-plante-ornementale-int%C3%A9rieure-figue-en-caoutchouc.jpg?s=2048x2048&w=is&k=20&c=zin7Nz0KUOhbtDjwkSnOZb7MFyx1Ze1kRwmlecDMM94=",
        commonName: "Rubber plant",
        scientificName: "Ficus elastica",
        lastWatering: "20/09/2025",
        nextWatering: "27/09/2025",
      },
      {
        id: 5,
        image:
          "https://media.istockphoto.com/id/951908336/fr/photo/plante-dint%C3%A9rieur-sansevieria-trifasciata.jpg?s=2048x2048&w=is&k=20&c=jpWacGvEr9sQmw91MUr1mHsi1mGj_El8jfh_HKKnktU=",
        commonName: "Snake plant",
        scientificName: "Sansevieria trifasciata",
        lastWatering: "18/09/2025",
        nextWatering: "02/10/2025",
      },
      {
        id: 6,
        image:
          "https://media.istockphoto.com/id/2162896537/fr/photo/chlorophytum-comosum.jpg?s=2048x2048&w=is&k=20&c=7dy_gGrHJJPk0xxGXoYnJiqvt9WPydxImw74VUAjrEs=",
        commonName: "Spider plant",
        scientificName: "Chlorophytum comosum",
        lastWatering: "21/09/2025",
        nextWatering: "28/09/2025",
      },
      {
        id: 7,
        image:
          "https://media.istockphoto.com/id/172279916/fr/photo/cactus-en-pot.jpg?s=2048x2048&w=is&k=20&c=eZQpd3alhD0QUbCl6N-u91PbueYVOc0tsb9Loc-32jM=",
        commonName: "Aloe vera",
        scientificName: "Aloe barbadensis",
        lastWatering: "15/09/2025",
        nextWatering: "05/10/2025",
      },
    ]);
  }),
];
