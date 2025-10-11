'use client'
import { useState } from "react";
import { Category } from "../types";
import Filter from "../filter";
import Iframe from "../iframe";

const categories: Category[] = [
    {
        "id": "287",
        "name": "Struktura atomu",
        "subCategories": [
            {
                "id": "291",
                "name": "Struktura atomu - ogólne"
            },
            {
                "id": "289",
                "name": "Elektrony w atomach, orbitale"
            },
            {
                "id": "290",
                "name": "Układ okresowy pierwiastków"
            }
        ]
    },
    {
        "id": "282",
        "name": "Atomy, cząsteczki, stechiometria",
        "subCategories": [
            {
                "id": "286",
                "name": "Stechiometria - ogólne"
            },
            {
                "id": "283",
                "name": "Masa atomowa, cząsteczkowa i molowa"
            },
            {
                "id": "288",
                "name": "Izotopy i promieniotwórczość"
            },
            {
                "id": "284",
                "name": "Prawo stałości składu, ustalanie wzoru"
            },
            {
                "id": "285",
                "name": "Stechiometryczny stosunek reagentów"
            }
        ]
    },
    {
        "id": "292",
        "name": "Wiązania chemiczne",
        "subCategories": [
            {
                "id": "295",
                "name": "Wiązania chemiczne - ogólne"
            },
            {
                "id": "293",
                "name": "Rodzaje wiązań i ich właściwości"
            },
            {
                "id": "294",
                "name": "Hybrydyzacja orbitali i kształt cząsteczek"
            }
        ]
    },
    {
        "id": "437",
        "name": "Systematyka związków nieorganicznych",
        "subCategories": [
            {
                "id": "438",
                "name": "Związki nieorganiczne – ogólne"
            },
            {
                "id": "439",
                "name": "Tlenki"
            },
            {
                "id": "440",
                "name": "Wodorki"
            },
            {
                "id": "441",
                "name": "Wodorotlenki"
            },
            {
                "id": "442",
                "name": "Kwasy"
            },
            {
                "id": "443",
                "name": "Sole"
            },
            {
                "id": "501",
                "name": "Związki kompleksowe"
            }
        ]
    },
    {
        "id": "296",
        "name": "Kinetyka i statyka chemiczna",
        "subCategories": [
            {
                "id": "299",
                "name": "Kinetyka i statyka chemiczna - ogólne"
            },
            {
                "id": "297",
                "name": "Stan równowagi"
            },
            {
                "id": "435",
                "name": "Szybkość reakcji"
            },
            {
                "id": "424",
                "name": "Energetyka reakcji"
            },
            {
                "id": "376",
                "name": "Wpływ czynników na przebieg reakcji"
            }
        ]
    },
    {
        "id": "300",
        "name": "Roztwory i reakcje w roztworach wodnych",
        "subCategories": [
            {
                "id": "304",
                "name": "Roztwory i reakcje w roztworach wodnych - ogólne"
            },
            {
                "id": "436",
                "name": "Właściwości roztworów i mieszanin"
            },
            {
                "id": "301",
                "name": "Stężenia roztworów"
            },
            {
                "id": "500",
                "name": "Rozpuszczalność substancji"
            },
            {
                "id": "302",
                "name": "Miareczkowanie"
            },
            {
                "id": "502",
                "name": "pH"
            },
            {
                "id": "503",
                "name": "Dysocjacja"
            },
            {
                "id": "303",
                "name": "Reakcje i właściwości kwasów i zasad"
            }
        ]
    },
    {
        "id": "305",
        "name": "Reakcje utleniania i redukcji",
        "subCategories": [
            {
                "id": "308",
                "name": "Reakcje utleniania i redukcji - ogólne"
            },
            {
                "id": "307",
                "name": "Stopnie utlenienia"
            },
            {
                "id": "306",
                "name": "Bilans elektronowy"
            }
        ]
    },
    {
        "id": "374",
        "name": "Elektrochemia",
        "subCategories": [
            {
                "id": "499",
                "name": "Elektrochemia - pozostałe"
            },
            {
                "id": "496",
                "name": "Elektroliza"
            },
            {
                "id": "497",
                "name": "Budowa i działanie ogniw"
            },
            {
                "id": "498",
                "name": "SEM"
            }
        ]
    },
    {
        "id": "378",
        "name": "Właściwości fizyczne cieczy i gazów"
    },
    {
        "id": "309",
        "name": "Metale"
    },
    {
        "id": "313",
        "name": "Niemetale"
    },
    {
        "id": "430",
        "name": "Podstawy chemii organicznej"
    },
    {
        "id": "316",
        "name": "Węglowodory",
        "subCategories": [
            {
                "id": "319",
                "name": "Węglowodory - ogólne"
            },
            {
                "id": "317",
                "name": "Węglowodory alifatyczne"
            },
            {
                "id": "318",
                "name": "Węglowodory aromatyczne"
            }
        ]
    },
    {
        "id": "320",
        "name": "Hydroksylowe pochodne węglowodorów",
        "subCategories": [
            {
                "id": "323",
                "name": "Hydroksylowe pochodne węglowodorów - ogólne"
            },
            {
                "id": "321",
                "name": "Alkohole"
            },
            {
                "id": "322",
                "name": "Fenole"
            }
        ]
    },
    {
        "id": "324",
        "name": "Związki karbonylowe",
        "subCategories": [
            {
                "id": "327",
                "name": "Związki karbonylowe - ogólne"
            },
            {
                "id": "325",
                "name": "Aldehydy"
            },
            {
                "id": "326",
                "name": "Ketony"
            }
        ]
    },
    {
        "id": "328",
        "name": "Kwasy karboksylowe"
    },
    {
        "id": "329",
        "name": "Estry i tłuszcze"
    },
    {
        "id": "330",
        "name": "Związki organiczne zawierające azot",
        "subCategories": [
            {
                "id": "445",
                "name": "Aminy"
            },
            {
                "id": "331",
                "name": "Aminokwasy"
            },
            {
                "id": "332",
                "name": "Peptydy i białka"
            },
            {
                "id": "333",
                "name": "Związki organiczne zawierające azot - pozostałe"
            }
        ]
    },
    {
        "id": "334",
        "name": "Cukry",
        "subCategories": [
            {
                "id": "338",
                "name": "Cukry - ogólne"
            },
            {
                "id": "335",
                "name": "Cukry proste"
            },
            {
                "id": "336",
                "name": "Disacharydy"
            },
            {
                "id": "337",
                "name": "Polisacharydy"
            }
        ]
    },
    {
        "id": "508",
        "name": "Izomeria",
        "subCategories": [
            {
                "id": "512",
                "name": "Izomeria - ogólne"
            },
            {
                "id": "510",
                "name": "Izomeria konstytucyjna"
            },
            {
                "id": "511",
                "name": "Izomeria geometryczna (cis-trans)"
            },
            {
                "id": "509",
                "name": "Izomeria optyczna"
            }
        ]
    },
    {
        "id": "504",
        "name": "Identyfikacja związków chemicznych",
        "subCategories": [
            {
                "id": "507",
                "name": "Identyfikacja związków - ogólne"
            },
            {
                "id": "506",
                "name": "Identyfikacja związków nieorganicznych"
            },
            {
                "id": "505",
                "name": "Identyfikacja związków organicznych"
            }
        ]
    },
    {
        "id": "431",
        "name": "Chemia wokół nas"
    },
    {
        "id": "432",
        "name": "Elementy ochrony środowiska"
    },
    {
        "id": "339",
        "name": "Pozostałe"
    }
]

export default function Page() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [url, setUrl] = useState('')

  const search = async () => {
    let query = `/tasks.html?mode=chemistry`

    selected.forEach(category => {
      query += '&category=' + category
    })

    setUrl(query)
  }

  return (
    <main className="flex max-w-screen m-0">
      <Filter categories={categories} selected={selected} setSelected={setSelected} search={search} />
      {url && <Iframe src={url} cssFiles={['/style-0.css', '/style-1.css', '/style-2.css', '/style-3.css', '/style-4.css', '/task-print-style.css']}>
      </Iframe>}
    </main>
  );
}