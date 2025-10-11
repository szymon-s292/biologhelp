'use client'
import { useState } from "react";
import { Category } from "../types";
import Filter from "../filter";
import Iframe from "../iframe";

const categories: Category[] = [
  {
    id: "9",
    name: "Wirusy, wiroidy, priony",
  },
  {
    id: "10",
    name: "Prokarionty",
  },
  {
    id: "11",
    name: "Protisty",
  },
  {
    id: "12",
    name: "Rośliny",
    subCategories: [
      {
        id: "13",
        name: "Mszaki",
      },
      {
        id: "14",
        name: "Paprotniki",
      },
      {
        id: "15",
        name: "Nasienne",
      },
      {
        id: "16",
        name: "Rośliny - pozostałe",
      },
    ],
  },
  {
    id: "17",
    name: "Grzyby",
  },
  {
    id: "18",
    name: "Bezkręgowce",
    subCategories: [
      {
        id: "19",
        name: "Gąbki",
      },
      {
        id: "20",
        name: "Parzydełkowce",
      },
      {
        id: "21",
        name: "Płazińce",
      },
      {
        id: "22",
        name: "Nicienie",
      },
      {
        id: "23",
        name: "Pierścienice",
      },
      {
        id: "24",
        name: "Mięczaki",
      },
      {
        id: "25",
        name: "Stawonogi",
      },
      {
        id: "26",
        name: "Szkarłupnie",
      },
      {
        id: "27",
        name: "Bezczaszkowce",
      },
      {
        id: "29",
        name: "Bezkręgowce - pozostałe",
      },
    ],
  },
  {
    id: "28",
    name: "Kręgowce",
    subCategories: [
      {
        id: "599",
        name: "Ryby",
      },
      {
        id: "594",
        name: "Płazy",
      },
      {
        id: "595",
        name: "Gady",
      },
      {
        id: "596",
        name: "Ptaki",
      },
      {
        id: "597",
        name: "Ssaki",
      },
      {
        id: "598",
        name: "Kręgowce - pozostałe",
      },
    ],
  },
  {
    id: "600",
    name: "Zwierzęta - ogólne",
  },
  {
    id: "30",
    name: "Skład organizmów",
  },
  {
    id: "31",
    name: "Budowa i funkcje komórki",
  },
  {
    id: "32",
    name: "Tkanki",
    subCategories: [
      {
        id: "33",
        name: "Tkanki roślinne",
      },
      {
        id: "34",
        name: "Tkanki zwierzęce",
      },
    ],
  },
  {
    id: "35",
    name: "Metabolizm",
    subCategories: [
      {
        id: "38",
        name: "Oddychanie komórkowe",
      },
      {
        id: "36",
        name: "Enzymy",
      },
      {
        id: "37",
        name: "Fotosynteza",
      },
      {
        id: "39",
        name: "Metabolizm - pozostałe",
      },
    ],
  },
  {
    id: "40",
    name: "Anatomia i fizjologia człowieka",
    subCategories: [
      {
        id: "41",
        name: "Układ pokarmowy i żywienie",
      },
      {
        id: "42",
        name: "Układ hormonalny",
      },
      {
        id: "43",
        name: "Układ nerwowy i narządy zmysłów",
      },
      {
        id: "44",
        name: "Układ immunologiczny",
      },
      {
        id: "45",
        name: "Układ krążenia",
      },
      {
        id: "46",
        name: "Układ oddechowy",
      },
      {
        id: "47",
        name: "Układ wydalniczy",
      },
      {
        id: "48",
        name: "Układ rozrodczy",
      },
      {
        id: "49",
        name: "Układ powłokowy",
      },
      {
        id: "130",
        name: "Układ kostny i mięśniowy",
      },
      {
        id: "50",
        name: "Anatomia i fizjologia - pozostałe",
      },
    ],
  },
  {
    id: "51",
    name: "Choroby człowieka",
  },
  {
    id: "52",
    name: "Fizjologia roślin",
  },
  {
    id: "53",
    name: "Genetyka",
    subCategories: [
      {
        id: "54",
        name: "Dziedziczenie",
      },
      {
        id: "55",
        name: "Ekspresja informacji genetycznej",
      },
      {
        id: "56",
        name: "Inżynieria i badania genetyczne",
      },
      {
        id: "593",
        name: "Mutacje",
      },
      {
        id: "57",
        name: "Genetyka - pozostałe",
      },
    ],
  },
  {
    id: "58",
    name: "Ewolucjonizm i historia życia na ziemi",
  },
  {
    id: "59",
    name: "Wpływ człowieka na środowisko i jego ochrona",
  },
  {
    id: "60",
    name: "Ekologia",
  },
  {
    id: "61",
    name: "Metody badawcze i doświadczenia",
  },
  {
    id: "62",
    name: "Pozostałe",
  },
];

export default function Page() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [url, setUrl] = useState('')

  const search = async () => {
    let query = `/tasks.html?mode=biology`

    selected.forEach(category => {
      query += '&category=' + category
    })

    setUrl(query)
  }
  return (
    <main className="flex max-w-screen">
      <Filter categories={categories} selected={selected} setSelected={setSelected} search={search} />
      {url && <Iframe src={url} cssFiles={['/style-0.css', '/style-1.css', '/style-2.css', '/style-3.css', '/style-4.css', '/task-print-style.css']}>
      </Iframe>}
    </main>
  );
}