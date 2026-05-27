import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  "https://mrfhnzjfqquremzuoxxp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZmhuempmcXF1cmVtenVveHhwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTU2ODExNCwiZXhwIjoyMDk1MTQ0MTE0fQ.S9Xzt3XPZ1aCPlfD4zTAYeXdXKWH0zrt5Nz-IfxTwqM"
);

// Category IDs
const C = {
  // Visage
  visage:          "d8c98407-3de2-4779-ada1-39342639362c",
  visageSoin:      "ea7be6cd-a896-46ed-928e-efdac4fd915a",
  visageSolaire:   "9ca580bc-9d94-42d9-a609-91b5b1e25fa9",
  visageBio:       "419b9c8f-9ef6-4041-86ea-01f9b0a0d9c8",
  // Corps
  corps:           "44e5382d-40a3-4829-b66c-7381b6cac321",
  corpsSoins:      "dce4a9f6-0481-410c-90e5-79e2d1f133fd",
  corpsHygiene:    "1a6078a9-9523-4a75-b2c6-faa4f3a77a7b",
  corpsMains:      "642ebba4-ed11-477c-a344-bd757aa4c8f9",
  corpsSolaire:    "baf80c87-4ac7-471a-9a32-54f48bc60d36",
  // Cheveux
  cheveux:         "89311cf6-be65-42dc-aaaf-179c74456b0e",
  cheveuxShamp:    "9431cb0b-136b-495c-a5a2-60939d3449c5",
  cheveuxPoux:     "5bca3619-cf9e-45a4-b05e-061c4d6fee29",
  cheveuxBio:      "ea495cad-e611-4c36-8e35-387c83b08461",
  // Sante
  sante:           "7610bebc-920f-4bef-a766-1d292115d5e0",
  santeSoins:      "3f81d086-b585-4fde-ad26-58a362d02e9c",
  santeTests:      "3f03c1a1-0afe-4d61-b785-f66d725d0327",
  santeNez:        "90431313-3e9d-4f7e-b376-7f9ab82f253e",
  // Maternite
  maternite:       "08f09e28-e866-432a-b849-c597be439f7d",
  materniteMaman:  "2738f71e-5807-4561-a077-ddb291ab0650",
  materniteBebeHygiene: "a5f3bf1a-ccf1-412f-8ac7-4793c16b74ef",
  materniteBebeS:  "c4f5b517-6dce-44d9-97a9-8ac0ff5fe0d7",
  // Homme
  homme:           "0fe7ff1c-5c35-4d38-adb2-8fe6ad87b996",
  // Dentaire
  dentaire:        "b7848390-836d-4172-b87a-49e24fdf9ec7",
  // Hygiene intime
  hygIntime:       "930cad31-b882-49ce-aa5c-47ed9e2d3a42",
  // Solaire parent
  solaire:         "b7165eec-0a68-49b8-a1db-74749e5cac4d",
};

// Exhaustive per-product name to category mapping
const MAP = {
  // A-Derma
  "A-Derma Biology AC Hydra Creme 40ml":              C.visageSoin,
  "A-Derma Cytelium Spray 100ml":                     C.corpsSoins,
  "A-Derma Dermalibour+ Cica Creme Reparatrice 50ml": C.corpsSoins,
  "A-Derma Epitelheliale A.H Ultra 40ml":             C.corpsSoins,
  "A-Derma Exomega Control Baume Emolliente 200ml":   C.corpsSoins,
  "A-Derma Exomega Control Creme Emolliente 200ml":   C.corpsSoins,
  "A-Derma Exomega Control Huile Lavante Emolliente 200ml": C.corpsHygiene,
  "A-Derma Exomega Control Huile Lavante Emolliente 500ml": C.corpsHygiene,
  "A-Derma Pain Surgras 100g":                        C.corpsHygiene,
  // Accu-Chek
  "Accu-Chek bandelette 50":    C.santeTests,
  "Accu-Chek Bandelettes 25":   C.santeTests,
  "Accu-chek instant 50strip":  C.santeTests,
  "Accu-Chek Kit Active":       C.santeTests,
  // Supplements
  "Acerola 1000 30cps":         C.sante,
  "Acerola 1600 14cps":         C.sante,
  // Acm
  "Acm Boreade CL Creme Lavante Pmg 200ml": C.visageSoin,
  // Actigel
  "Actigel surgras doux Ps Acti ceutic  200ml": C.corpsHygiene,
  // Supplements
  "Activlab omega 3 1000mg 60capsules": C.sante,
  // Acure
  "Acure brightening facial scrub 118ml": C.visageSoin,
  // Addax
  "Addax Arnica Gel 15g":                  C.santeSoins,
  "Addax Bactospray 125ml":                C.santeSoins,
  "Addax Bactospray 60ml":                 C.santeSoins,
  "Addax Emulsion Reparatrice":            C.corpsSoins,
  "Addax Expert Solution Ongles Mycoses":  C.corpsMains,
  "Addax Keracid Kerato 50ml":             C.corpsMains,
  "Addax Septidol 5 250ml":               C.santeSoins,
  "Addax Septidol 8 250ml":               C.santeSoins,
  // Anua
  "Anua Azelaic Acid 10 Hyaluronic serum 30ml":         C.visageSoin,
  "Anua Green Lemon Vita c Blemish Serum 20g":          C.visageSoin,
  "Anua HeartleaF 70 Intense Calming Cream 50ml":       C.visageSoin,
  "Anua HeartleaF 77 Clear Pad 160ml":                  C.visageSoin,
  "Anua HeartleaF Quercetinol Pore Deep Cleansing Foam 150ml": C.visageSoin,
  "Anua HeartleaF Siky Moisture Sun Cream 50ml":        C.visageSolaire,
  "Anua HeartleaF Succinic Moisture Cleansing Foam 150ml": C.visageSoin,
  "Anua Peach 70 Niacin Serum 30ml":                    C.visageSoin,
  "Anua Peach 77 Niacin Enriched cream 50ml":           C.visageSoin,
  "Anua Peach 77 Niacin Essence Toner 250ml":           C.visageSoin,
  "Anua Peach 77% Niacin Conditioning Milk 150ml":      C.visageSoin,
  // Aposeche
  "Aposeche Creme Emolliente 250ml": C.corpsSoins,
  // Aquareva
  "Aquareva Creme Legere 40ml": C.visageSoin,
  // Atoderm
  "Atoderm Huile de Douche 1L": C.corpsHygiene,
  // Avene (Av)
  "Av Cicalfate Mains 100ml":                    C.corpsMains,
  "Av Cleanance 50+ 50ml":                       C.visageSolaire,
  "Av Cleanance Comedomed 30ml":                 C.visageSoin,
  "Av Cleanance Gel Nett Pg 200ml":             C.visageSoin,
  "Av Cleanance Hydra Creme Apaisante 40ml":    C.visageSoin,
  "Av Cold Cream Ps 40ml":                       C.visageSoin,
  "Av Cold Cream Psts 100ml":                    C.corpsSoins,
  "Av Eau Thermale 150ml":                       C.visageSoin,
  "Av Eau Thermale 300ml":                       C.visageSoin,
  "Av Ecran Anti-Age THP spf50+ 50ml":          C.visageSolaire,
  "Av Ecran Creme Anti-Oxydante":               C.visageSolaire,
  "Av Ecran Fluide spf50+ 50ml":                C.visageSolaire,
  "Av Ecran Sunsimed THP ps 80ml":              C.visageSolaire,
  "Av Ecran Teinte 50":                          C.visageSolaire,
  "Av Hydrance Aqua-Gel Creme Hydratant 50ml":  C.visageSoin,
  "Av Hydrance Legere emulsion hydratant 40ml": C.visageSoin,
  "Av Hydrance Riche Creme Hydratante 40ml":    C.visageSoin,
  "Av Hydrance Uv Legere emulsion hydratant spf30 40ml": C.visageSolaire,
  "Av Hydrance Uv Riche creme hydratante spf30 40ml":    C.visageSolaire,
  "Av Tolerance control creme apaisante 40ml":  C.visageSoin,
  "Av Tolerance hydra-10 creme hydratant Ps 40ml": C.visageSoin,
  // BD syringes
  "Bd micro-fine plus seringue insuline 0.5ml sachets de 10 pcs": C.santeTests,
  "Bd micro-fine plus seringue insuline 1ml Sachets de 10pcs":    C.santeTests,
  // Beauty Of Joseon
  "Beauty Of Joseon Apricot Blossom Peeling Gel 100ml":     C.visageSoin,
  "Beauty Of Joseon Dynasty Cream 50ml":                     C.visageSoin,
  "Beauty Of Joseon Ginseng Cleansing Oil 210ml":            C.visageSoin,
  "Beauty Of Joseon Ginseng Essence Water 150ml":            C.visageSoin,
  "Beauty Of Joseon Ginseng Moist Sun Serum spf50+ PA++++ 50ml": C.visageSolaire,
  "Beauty Of Joseon Glow Replenishing rice milk":            C.visageSoin,
  "Beauty Of Joseon Green Plum Refreshing Cleanser 100ml":   C.visageSoin,
  "Beauty Of Joseon Ground Rice and Honey Glow Mask 150ml":  C.visageSoin,
  "Beauty Of Joseon Hanbang Serum Discovery Kit":            C.visageSoin,
  "Beauty Of Joseon Radiance Cleansing Balm 100ml":          C.visageSoin,
  "Beauty Of Joseon Red Bean Refreshing Pore Mask 140ml":    C.visageSoin,
  "Beauty of Joseon Red Bean Water Gel 100ml":               C.visageSoin,
  // Bella Aurora
  "Bella Aurora Ecran spf 50 Peaux Mixte-Grasse 50ml":     C.visageSolaire,
  "Bella Aurora Ecran spf 50 Peaux Norm-Seches 50ml":      C.visageSolaire,
  "Bella Aurora Ecran spf 50 Pmg 50ml Trousse":            C.visageSolaire,
  "Bella Aurora Ecran spf 50 Pns 50ml Trousse":            C.visageSolaire,
  // Bicarbonate
  "Bicarbonate de soude Flacon 250g": C.santeSoins,
  "Bicarbonate de soude Gm 250g":     C.santeSoins,
  "Bicarbonate de soude Pm 125g":     C.santeSoins,
  // Bio-oil
  "Bio-oil huile de soin  25ML":   C.corpsSoins,
  "Bio-oil huile de soin 125ml":   C.corpsSoins,
  "Bio-oil huile de soin 200ml":   C.corpsSoins,
  "Bio-oil Huile de soin 60ml":    C.corpsSoins,
  "Bio-oil Natural 200ml":         C.corpsSoins,
  "Bio-oil Naturel 125ml":         C.corpsSoins,
  // Biodance
  "Biodance Bio Collagen-Real Deep Mask 4pcs":     C.visageSoin,
  "Biodance Hydro Cera-Nol Real Deep Mask 4 pcs":  C.visageSoin,
  // Bioderma
  "Bioderma Pigmentbio foaming cream 200ml":      C.visageSoin,
  "Bioderma Pigmentbio sensitive areas 75ml":     C.visageSoin,
  // Supplements
  "Biofar 12 vitamine 20cps":           C.sante,
  "Biofar Ace Selenium-Zinc 20cps":     C.sante,
  "Biofar Digestion Bte 8cps":          C.sante,
  "Biofar Vitamine C Acerola 500 20cps":C.sante,
  "Bioforma Forma max 90 gelules":      C.sante,
  "Biolectra Magnesium forte 20comprimes": C.sante,
  // Antiseptics
  "Biosept 7.5 gel antiseptique traitant 120ml": C.santeSoins,
  // Hair supplements
  "Biosti Hair Zinc B6-B8 30gelules": C.sante,
  // Biretix face acne
  "Biretix Duo 30Ml":                              C.visageSoin,
  "Biretix isorepair cream 50ml":                  C.visageSoin,
  "Biretix Tri-active Gel anti-imperfections 50ml":  C.visageSoin,
  "Biretix Tri-active spray anti-imperfections 100ml": C.visageSoin,
  // Body Fine orthopaedic
  "Body Fine Elastic Chevillere M":  C.santeSoins,
  "Body Fine Elastic Genouillere M": C.santeSoins,
  // Baby
  "Calmabebe huile de toilette 100ml": C.materniteBebeHygiene,
  // Camomilla Blu
  "Camomilla Blu gel Nett surgras 500ml+ Serviette Trousse": C.corpsHygiene,
  "Camomilla Blu gel nettoyant surgras 500Ml":               C.corpsHygiene,
  // Hair supplements
  "Caphair Anti-Chute Bte 60gelules":                      C.sante,
  "Capiderma Capiphan ongles & cheveux 60capsules":         C.sante,
  "Capiderma Capiwhite HQ soin depigmentant 35ml":          C.visageSoin,
  "Capiderma Creme Hydratante Visage 40Ml":                 C.visageSoin,
  // Korean skincare
  "Celimax Retinal Shot 15ml": C.visageSoin,
  // Centaurea
  "Centaurea creme eclaircissante spf50+ 50ml":      C.visageSolaire,
  "Centaurea gel moussant purifiant anti-acne 200ml": C.visageSoin,
  // Centelys
  "Centelys Creme Reparatrice 30G": C.corpsSoins,
  // Cerave
  "Cerave Baume Hydratant avec Pompe 454g":     C.corpsSoins,
  "Cerave Baume Hydratant PS 177ml":            C.corpsSoins,
  "Cerave Baume Hydratant PS 340g":             C.corpsSoins,
  "Cerave baume hydratant PS 454g":             C.corpsSoins,
  "Cerave baume hydratant PS 50ml":             C.visageSoin,
  "Cerave creme hydratant visage 52ml":         C.visageSoin,
  "Cerave creme hydratante spf30 52ml":         C.visageSolaire,
  "Cerave Creme Hydratante spf50 52ml":         C.visageSolaire,
  "Cerave creme lavantE hydratante PNS 236ml":  C.visageSoin,
  "Cerave creme lavantE hydratante PNS 473ml":  C.corpsHygiene,
  "Cerave creme mains reparatrice 50ml":        C.corpsMains,
  "Cerave Creme moussant Nett hydratant ps 236ml": C.visageSoin,
  "Cerave Creme reparatrice Contour Yeux 14ml": C.visageSoin,
  "Cerave eau micellaire hydratante 295ml":     C.visageSoin,
  "Cerave gel creme hydratant oil Control Pmg 52ml": C.visageSoin,
  "Cerave gel moussant anti-imperfection 236ml": C.visageSoin,
  "Cerave Gel Moussant png 236ml":              C.visageSoin,
  "Cerave gel moussant PNG 473ml":              C.corpsHygiene,
  "Cerave Huile lavante Moussante 236ml":       C.corpsHygiene,
  "Cerave Huile lavante Moussante 473ml":       C.corpsHygiene,
  "Cerave lait hydratant PS 236ml":             C.corpsSoins,
  "Cerave lait hydratant PS 473 ml":            C.corpsSoins,
  "Cerave SA creme anti-rugosites 177ml":       C.corpsSoins,
  "Cerave SA creme anti-rugosites 340g":        C.corpsSoins,
  "Cerave SA Creme Pieds Regenerante 88ml":     C.corpsMains,
  "Cerave SA Gel Nettoyant Anti-Rugosites 236ml": C.corpsSoins,
  "Cerave SA Gel Nettoyant Anti-Rugosites 473ml": C.corpsSoins,
  "Cerave Serum Retinol Anti-Marques 30ml":     C.visageSoin,
  "Cerave Soin Concentre Anti-Imperfection 40ml": C.visageSoin,
  // Cetaphil
  "Cetaphil Creme Hydratante 100g":     C.corpsSoins,
  "Cetaphil Creme Hydratante 453g":     C.corpsSoins,
  "Cetaphil Lotion Hydratante 236ml":   C.corpsSoins,
  "Cetaphil Lotion Hydratante 500ml":   C.corpsSoins,
  "Cetaphil Lotion Nettoyant 473ml":    C.corpsHygiene,
  "Cetaphil Lotion Nettoyante 200ml":   C.visageSoin,
  "Cetaphil Lotion Nettoyante 236ml":   C.visageSoin,
  "Cetaphil Lotion Nettoyante 500ml":   C.corpsHygiene,
  "Cetaphil Oily Skin Cleanser 236ml":  C.visageSoin,
  "Cetaphil Pro Acne Lotion Hydratant Spf30 120ml": C.visageSolaire,
  "Cetaphil Pro Acne Mousse Nettoyant 235ml":       C.visageSoin,
  "Cetaphil Sun Face Fluide spf50+ 50ml":            C.visageSolaire,
  "Cetaphil Sun Light Gel spf50+ 100ml":             C.corpsSolaire,
  "Cetaphil Sun Lotion spf50+ 100ml":                C.corpsSolaire,
  "Cetaphil Sun Lotion spf50+ 50ml":                 C.visageSolaire,
  // Clarine
  "Clarine Creme Eclaircissante": C.visageSoin,
  "Clarine Ecran Invisible":      C.visageSolaire,
  "Clarine Ecran Opaque":         C.visageSolaire,
  // Clarskin / Clermine
  "Clarskin 3 Tube 30 G": C.visageSoin,
  "Clermine 30 G":         C.visageSoin,
  // Cliniceutica
  "Cliniceutica Effacnyl creme purifiante 50ml": C.visageSoin,
  // Codexial
  "Codexial Enviroscab Aerosol 200ml": C.santeSoins,
  // Comfort first aid
  "Comfort Plus Emplatre Pm Unite":              C.santeSoins,
  "Comfort Thermometre Digital Transparent couleurs": C.santeTests,
  // Supplements
  "Complemax Ashwaganda 60 gelules":                C.sante,
  "Complemax Bisglycinate de Magnesium 60 gelules": C.sante,
  "Complemax Collagene Marin 330mg 90gelules":      C.sante,
  "Complemax propolis + Vitamine C 250mg 60 gelules": C.sante,
  "Complemax zinc B6 40 gelules":                   C.sante,
  // Test strips
  "Contour Plus Bandelettes 25pcs": C.santeTests,
  "Contour Plus Bandlettes 50pcs":  C.santeTests,
  // Corycid
  "corycid solution 15ml": C.santeSoins,
  // COSRX
  "COSRX Acne pimple Master patch 24 patches":          C.visageSoin,
  "COSRX Advanced Snail 92 All In One Cream 100g":      C.visageSoin,
  "COSRX Advanced Snail Mucin Power essence 100ml":     C.visageSoin,
  "COSRX Advanced Snail Peptide Eye cream 25ml":        C.visageSoin,
  "COSRX Advanced Snail Radiance Dual Essence 80ml":    C.visageSoin,
  "COSRX Low PH Good Morning Gel Cleanser 150ml":       C.visageSoin,
  // Cotton
  "Cotonet coton Disque demaq 120pcs": C.visageSoin,
  // Curaskin
  "Curaskin Curasun Ecran invisible spf50+ 50ml":       C.visageSolaire,
  "Curaskin Curawhite mousse nettoyant eclat 150ml":    C.visageSoin,
  "Curaskin Hydracure creme hydratante 72H 50ml":       C.visageSoin,
  "Curaskin sebocure 2% BHA lotion exfoliant 100ml":    C.visageSoin,
  "Curaskin sebocure creme anti-imperfection 40ml":     C.visageSoin,
  "Curaskin sebocure gel nettoyant seboregulateur PG 200ml": C.visageSoin,
  // Supplements
  "Cystiphane biorga b6 120 comprimes": C.sante,
  // D-Biotic
  "D-biotic eclabiotic gel eclaircissant exfoliant 200ml": C.visageSoin,
  "D-biotic eclabiotic intense 50ml":                      C.visageSoin,
  "D-biotic eclabiotic radiance spf30+ 50ml":             C.visageSolaire,
  "D-Biotic sebiotic ecran solaire matiffiant hyd spf50+ 50ml": C.visageSolaire,
  "D-Biotic Velvet sunscreen Toucher sec spf50+ 50ml":    C.visageSolaire,
  // Darcare thermometer
  "Darcare Thermometre digital Flexible": C.santeTests,
  // Daylong
  "Daylong 50+ Extreme 100Ml":                       C.corpsSolaire,
  "Daylong 50+ Extreme gel creme sensitive 100ml":   C.corpsSolaire,
  "Daylong 50+ Extreme sensitive gel 50 ml":         C.visageSolaire,
  "Daylong 50+ Sport gel 50ml":                      C.visageSolaire,
  "Daylong Actinica 80G":                            C.visageSolaire,
  // DCP
  "DCP Cicasept Creme cicatrisante 40ml":           C.santeSoins,
  "DCP Depi-gel 200ml":                             C.corpsSoins,
  "DCP koproz mousse nettoyante 150ml":             C.visageSoin,
  "DCP KPP Soin Mains & Pieds 100ml":              C.corpsMains,
  "DCP moist intense creme ultra confort 50ml":     C.visageSoin,
  "DCP Nc 10 Serum 50ml":                           C.visageSoin,
  "DCP Soin lipidik AP+ 200ml":                     C.corpsSoins,
  "DCP sunscreen hydro creme invisible spf50+ 100ml": C.visageSolaire,
  "DCP Sunscreen invisible spf50+ 50ml":            C.visageSolaire,
  "DCP Syndet lipidik 200ml":                       C.corpsHygiene,
  "DCP trio-acne gel nettoyant 200ml":              C.visageSoin,
  "DCP trio-acne soin ski 30ml":                    C.visageSoin,
  "DCP Uree 50% Hyperkeratose localisee 30ml":      C.corpsMains,
  // Depiwhite
  "Depiwhite Lait Eclaircissant 200ml":       C.corpsSoins,
  "Depiwhite Lait eclaircissant 500Ml":       C.corpsSoins,
  "Depiwhite Mousse Nett Eclaircissant 200ml": C.visageSoin,
  "Depiwhite.M ecran spf50":                  C.visageSolaire,
  "Depiwhite.S Ecran Solaire spf50+ 50ml":    C.visageSolaire,
  // Dercos
  "Dercos Shamp Anti-Pelliculaire Chvx Gras Refill Recharge 390ml": C.cheveuxShamp,
  // Dermaceutic
  "Dermaceutic Advanced Cleanser 150ml":    C.visageSoin,
  "Dermaceutic C25 Creme 30ml":             C.visageSoin,
  "Dermaceutic Sun Ceutic Spf50 50ml":      C.visageSolaire,
  // Dermacia
  "Dermacia Melawhite Blister 60gelules":    C.sante,
  "Dermacia Melawhite creme depigmentante 50ml": C.visageSoin,
  // Dermadoc
  "Dermadoc Creme Anti-Age 40ml":                         C.visageSoin,
  "Dermadoc Creme Anti-Cernes 30ml":                      C.visageSoin,
  "Dermadoc Creme Depigmentante Intensive spf15+ 40ml":   C.visageSoin,
  "Dermadoc Creme Hydratante 80ml":                       C.visageSoin,
  "Dermadoc Ecran Solaire Invisible spf50+ 50ml":         C.visageSolaire,
  "Dermadoc Gel Nettoyant Eclaircissante 200ml":          C.visageSoin,
  // Dermagor
  "Dermagor atopicalm savon surgras 150g":   C.corpsHygiene,
  "Dermagor Atopicalm Tbe 250Ml":            C.corpsSoins,
  "Dermagor Cold Creme 40 Ml":               C.visageSoin,
  // Dermocare
  "Dermocare Creme Eclaircissante Visage 40ml":     C.visageSoin,
  "Dermocare Ecran fluide invisible spf50 50ml":    C.visageSolaire,
  "Dermocare gel nettoyant eclaircissante 200ml":   C.visageSoin,
  "Dermocare gel nettoyant eclaircissante 400ml":   C.visageSoin,
  // DF
  "DF Antitache Creme 30ml": C.visageSoin,
  // Diab Control
  "Diab Control Bandlettes 25pcs":     C.santeTests,
  "Diab Control Bandlettes Bte de 50pcs": C.santeTests,
  // Supplements
  "Dietaroma 6 Magnesium Forte 300mg 30gelules":    C.sante,
  "Dietaroma Articulior forte Gluco Chondro 20 cps": C.sante,
  "Doppel Herz A-Z Depot 30 comp":                  C.sante,
  "Doppel Herz Lacto-pro 20 capsules":              C.sante,
  "Doppel Herz Magnesium 30cps":                    C.sante,
  // Dr ALTHEA Korean skincare
  "Dr.ALTHEA 147 Barrier Cream 50ml":  C.visageSoin,
  "Dr.ALTHEA 345 Relief Cream 50ml":   C.visageSoin,
  // Ducray (Duc)
  "Duc Anacaps reactiv 30 capsules":              C.sante,
  "Duc dexyane Med creme reparatrice 100ml":      C.corpsSoins,
  "Duc dexyane Med Palpebral 15ml":               C.visageSoin,
  "Duc Ictyane Creme emollient 200Ml":            C.corpsSoins,
  "Duc Ictyane hydra creme legere Pns 40ml":      C.visageSoin,
  "Duc Ictyane Nutri creme Riche Ps 40ml":        C.visageSoin,
  "Duc Kelual Emulsion 50Ml":                     C.visageSoin,
  "Duc keracnyl creme repair defi 50Ml":          C.visageSoin,
  "Duc Keracnyl Gel Moussant 200Ml":              C.visageSoin,
  "Duc Keracnyl Pp+ Creme anti-imperfection 30ml": C.visageSoin,
  "Duc keracnyl serum 30ml":                      C.visageSoin,
  "Duc keracnyl UV fluide anti-imperfection 50ml": C.visageSolaire,
  "Duc melascreen creme anti-taches protectrice spf50+ 50ml": C.visageSolaire,
  "Duc melascreen Fluide anti-taches protectrice spf50+ 50ml": C.visageSolaire,
  "Duc Squanorm Lotion au Zinc Anti-Pelliculaire 200ml": C.cheveux,
  "Duc squanorm shamp Traitant pellicules Grasses 200ml": C.cheveuxShamp,
  "Duc Squanorm Shamp Traitant Pellicules Seches 200ml":  C.cheveuxShamp,
  // Anti-poux
  "Duo LP-PRO 150ml": C.cheveuxPoux,
  // Duolys
  "Duolys contour yeux 15ml":      C.visageSoin,
  "Duolys Creme legere anti-age 40Ml": C.visageSoin,
  "Duolys Creme Riche anti-age 40Ml":  C.visageSoin,
  "Duolys Ecran Solaire 50 Ml":        C.visageSolaire,
  // Dwhite
  "Dwhite Ecran Solaire Invisible spf50+ 50ml":        C.visageSolaire,
  "Dwhite Ecran Solaire Teinte Claire spf50+ 50ml":    C.visageSolaire,
  // Ecladerm
  "Ecladerm Eclawhite Creme Eclaircissante 40ml":      C.visageSoin,
  "Ecladerm Hydra Derm Creme Hydratante 50ml":         C.visageSoin,
  "Ecladerm Nettoderm Gel Nettoyant 200ml":            C.visageSoin,
  "Ecladerm Nettoderm Gel Nettoyant 400ml":            C.visageSoin,
  "Ecladerm Protect Glow Ecran Fluide invisible spf50+ 50ml": C.visageSolaire,
  "Ecladerm Sun Derm Ecran Solaire Invisible spf50+ 50ml":    C.visageSolaire,
  // Ecrinal
  "Ecrinal Gel Cils Fortifiant 9ml": C.visageSoin,
  // Eliderm body solar
  "Eliderm sun care lait solaire adulte spf50+ 200ml": C.corpsSolaire,
  // Elliance antiseptic
  "Elliance Septispray 125Ml": C.santeSoins,
  // Embryolisse
  "Embryolisse Lait Creme Concentre 75ml": C.visageSoin,
  // Endocare
  "Endocare tensage creme regenerateur 50ml": C.visageSoin,
  // Enoliss
  "Enoliss perfect skin 10 AHA 30ml":         C.visageSoin,
  "Enoliss perfect skin 15 AHA 30ml":         C.visageSoin,
  "Enoliss perfect skin body 25 AHA 100ml":   C.corpsSoins,
  // Eosine
  "Eosine 2% Derma Genese Spray 30ml": C.santeSoins,
  // Epta
  "Epta PSO Ongles Solution 12ml":    C.corpsMains,
  "Epta Spot Creme Depigmentante":    C.visageSoin,
  "Epta Spot Lait 100ml":             C.corpsSoins,
  // Supplements
  "Eric favre complexe Vitamine B MAX 60cps":    C.sante,
  "Eric favre complexe Vitamine B MAX 90cps":    C.sante,
  "Eric Favre Omega 3 3000mg 120gelules":        C.sante,
  "Eric Favre Omega 3 6000mg 60cps":             C.sante,
  // Etiaxil
  "Etiaxil Anti-Transpirant Protection Vaporisateur Spray 100ml": C.corpsHygiene,
  "Etiaxil detranspirant Roll-on Aisselles Pn 15ml":              C.corpsHygiene,
  "Etiaxil detranspirant Roll-on Aisselles Ps 15ml":              C.corpsHygiene,
  // Eucerin
  "Eucerin Anti-Pigment Cleansing Gel 200ml":           C.visageSoin,
  "Eucerin anti-pigment serum duo 30ml":                C.visageSoin,
  "Eucerin anti-pigment soin Contour des yeux illuminateur 15ml": C.visageSoin,
  "Eucerin anti-pigment soin de jour spf30 50ml":       C.visageSolaire,
  "Eucerin anti-pigment soin de nuit 50ml":             C.visageSoin,
  "Eucerin Aquaphor lip balm 10ml":                     C.visageSoin,
  "Eucerin Creme Mains 5% D Uree":                      C.corpsMains,
  "Eucerin Creme Pieds Reparateur 10% Uree":            C.corpsMains,
  "Eucerin Dermopure Gommage 100ml":                    C.visageSoin,
  "Eucerin Dermopure hydra creme 50ml":                 C.visageSoin,
  "Eucerin dermopurifyer oil control gel nett 200ml":   C.visageSoin,
  "Eucerin dermopurifyer Triple Effect Serum 40ml":     C.visageSoin,
  "Eucerin Ecran Huile Control 50ml":                   C.visageSolaire,
  "Eucerin ecran hydro protect spf50+ 50ml":            C.visageSolaire,
  "Eucerin Ecran Pigment Control Fluide spf50+ 50ml":   C.visageSolaire,
  "Eucerin Ecran sun creme spf50+ 50ml":                C.visageSolaire,
  "Eucerin Ecran sun fluide anti-age 50ml":             C.visageSolaire,
  "Eucerin Hyaluron Filler +Elasticity 3D serum 30ml":  C.visageSoin,
  "Eucerin Hyaluron Filler Yeux 15ml":                  C.visageSoin,
  "Eucerin hyaluron filler+ elasticity jour spf15 50ml": C.visageSolaire,
  "Eucerin hyaluron filler+ elasticity nuit 50ml":      C.visageSoin,
  "Eucerin Hyaluron-Filler Jour spf15 50ml":            C.visageSolaire,
  "Eucerin Hyaluron-Filler Nuit":                       C.visageSoin,
  // Excipial
  "Excipial Pruri Lotion": C.corpsSoins,
  // Supplements
  "Extralevure 125Comprimes":  C.sante,
  "Extralevure 375 Comprimes": C.sante,
  "Fenioux Omega 3 500mg 200capsules":   C.sante,
  "Fenioux Omega 3 Fort 502mg 120gelules": C.sante,
  // Filorga
  "Filorga Optim-Eyes 15 Ml":        C.visageSoin,
  "Filorga Time -Filler 5xp cream 50ml": C.visageSoin,
  "Filorga UV Defense spf50":        C.visageSolaire,
  // Supplements
  "Folio 120cps":                  C.materniteMaman,
  "Forcapil 180 gellules":         C.sante,
  "Forcapil Bte 60 gelules":       C.sante,
  "Forte pharma Acerola 60 Cps":   C.sante,
  "Forte Pharma Expert collagene intense 14 sticks": C.sante,
  "Forte pharma Melatonine 1900 flash 30 cps":       C.sante,
  "Forte pharma Melatonine 30 Gommes":               C.sante,
  "Forte Pharma Ultra Boost 4G 20cps":               C.sante,
  "Forte pharma Vitalite 4G dynamisant 30ampoules":  C.sante,
  "Fortiphane 60 Gelules":         C.sante,
  // ISDIN Fotoprotector
  "Foto ultra active unify Transparent spf50+ 50ml":     C.visageSolaire,
  "Foto Ultra anti-age repaire 50ml":                    C.visageSolaire,
  "Fotoprotecteur Fusion fluide water Magic 50Ml":       C.visageSolaire,
  "Fotoprotecteur labial spf50+ 4g":                     C.visageSoin,
  "Fotoprotector Fusion water color Light spf50 50ml":   C.visageSolaire,
  "Fotoprotector spray transparent adulte spf50 250ml":  C.corpsSolaire,
  // Supplements
  "Gayelord 400 cp": C.sante,
  // Gifrer physiological saline
  "Gifrer serum physiologique bte 12": C.santeNez,
  "Gifrer serum physiologique bte 40": C.santeNez,
  "Gifrer serum physiologique bte 5":  C.santeNez,
  // Gleamy
  "Gleamy Creme hydratante Antilumiere Bleue 50ml": C.visageSoin,
  "Gleamy Fer liposomal 30 gelules":                C.sante,
  "Gleamy super collagene 30 gelules":              C.sante,
  "Gleamy super Melatonine 30 gelules":             C.sante,
  // Supplements
  "Glisodin V-SOD 60gelules": C.sante,
  // Gold Creme
  "Gold Creme Stick Bleu": C.santeSoins,
  "Gold Creme Stick Rose": C.santeSoins,
  // Supplements
  "GPH Magnesium Bisglycinate 90 gelules": C.sante,
  // Cotton makeup remover
  "Hartmann Sterilux disque demaquiller 70sachet 918660": C.santeSoins,
  // HCG pregnancy test
  "HCG test de grossesse bte 25": C.santeTests,
  // Supplements
  "Health power Hyaluroclair 60 comprimes":  C.sante,
  "Health power MAgnesium Glycinate 60 gelules": C.sante,
  // Heliabrine
  "Heliabrine O-regen mousse nettoyant 200ml": C.visageSoin,
  // Heliocare
  "Heliocare 360° fluid cream spf50":                     C.visageSolaire,
  "Heliocare 360° gel creme spf100+ 50ml":               C.visageSolaire,
  "Heliocare 360° gel oil-free spf50":                    C.visageSolaire,
  "Heliocare 360° mineral tolerance fluide spf50":        C.visageSolaire,
  "Heliocare 360° Pigment solution Fluide spf50+ 50ml":  C.visageSolaire,
  "Heliocare color gelcrem light spf50 50ml":             C.visageSolaire,
  "Heliocare ultra D 30 Gelules":                         C.sante,
  "heliocare ultra gel spf90":                            C.visageSolaire,
  // Supplements iron
  "Hemavit fer 30 capsules":    C.sante,
  "Hemavit fer Liquide 200mL":  C.sante,
  // Herome nails hands
  "Herome Creme Anti Gercure":                C.corpsMains,
  "Herome Creme Mains 24h spf15":             C.corpsMains,
  "Herome Creme Mains Anti-Pigmentation":     C.corpsMains,
  "Herome Dissolvant Ss Acetone":             C.corpsMains,
  "Herome Durcisseur Extra Fort Pour Les Ongles":  C.corpsMains,
  "Herome Durcisseur Fort Pour Les Ongles 10ml":   C.corpsMains,
  // Hidrospot
  "Hidrospot gel depigmentante 2% 30gr": C.visageSoin,
  // HT Ceutic
  "HT Ceutic Mousse Nett Booster Eclat 150ml": C.visageSoin,
  "HT Ceutic Protek spf50+ 50ml":              C.visageSolaire,
  // Supplements melatonin
  "Hydra plus melatonine 1.8 mg 36gelules": C.sante,
  "Hydra plus melatonine 1.8mg 60gelules":  C.sante,
  // Bioderma Hydrabio
  "Hydrabio gel creme legere pnm 40ml": C.visageSoin,
  // Hydracalm
  "Hydracalm Creme Hydratante et Apaissante Ps Acti Ceutic 40ml": C.visageSoin,
  // Ialuset
  "Ialuset Creme Tube 100 G": C.santeSoins,
  // Iraltone hair
  "Iraltone anti hair loss lotion 100ml": C.cheveux,
  "Iraltone Ds Gel cream 50ml":           C.cheveux,
  "Iraltone shamp ds 200ml":              C.cheveuxShamp,
  // ISDIN
  "Isdin cicapost cream 3en1 50g":   C.corpsSoins,
  "Isdin Retinal Intense serum 50ml": C.visageSoin,
  // Jonzac
  "Jonzac Nutritive ATO+ Huile lavante relipidant 500ml": C.corpsHygiene,
  "Jonzac Rehydrate soin leger fondant 50ml":             C.visageSoin,
  // Baby
  "Juniors bande ombilicales 2unites": C.materniteBebeHygiene,
  // Scar gels
  "kelocote gel cicatrice 15g":        C.santeSoins,
  "kelocote gel cicatrice 6g":         C.santeSoins,
  "kelocote uv gel cicatrice spf30 15g": C.santeSoins,
  // Ketopan shampoo
  "Ketopan Mousse": C.cheveuxShamp,
  // Kintex syrup children vitamins
  "Kintex Sirop 100 Ml": C.sante,
  // KL hair care
  "KL Baume Apres Shamp a la Quinine 200ml":  C.cheveux,
  "KL Nutrition Baume Apres Shamp Mangue 200ml": C.cheveux,
  "KL Serum Anti-Chute a La Quinine 100ml":   C.cheveux,
  "Kl Shamp A La Camomille 200Ml":            C.cheveuxShamp,
  "Kl Shamp A La Camomille 400ml":            C.cheveuxShamp,
  "KL Shamp a la Mangue 400ml":               C.cheveuxShamp,
  "KL Shamp A La Quinine 200ml":              C.cheveuxShamp,
  "KL Shamp A La Quinine 400ml":              C.cheveuxShamp,
  "KL shamp au Cupuacu 400ml":                C.cheveuxShamp,
  // Lca Repair
  "Lca Repair Creme Reparatrice 120ml": C.corpsSoins,
  // Supplements
  "Lero Phaneres": C.sante,
  // Listerine dental
  "Listerine Fraicheur sans alcool 250ml": C.dentaire,
  // Supplements
  "Maelys Selenium 60gelues":  C.sante,
  "Maelys Zinc 30gelules":     C.sante,
  "Maelys Zinc 60gelules":     C.sante,
  // Marie Rose anti-poux
  "Marie rose lotion anti-poux 100ML": C.cheveuxPoux,
  "Marie rose shamp anti-poux":        C.cheveuxPoux,
  // Maviderma
  "Maviderma Mousse Nettoyant Eclaircissante 150ml": C.visageSoin,
  // Mccosmetics
  "Mccosmetics Sun block cream 50+ 50ml": C.visageSolaire,
  // MDC
  "MDC Hydrating Facial Cleanser 150ml": C.visageSoin,
  // Supplements
  "Menopace 30 capsules": C.sante,
  "Mgd Biomega 3 90 capsules":       C.sante,
  "Mgd chrom 60gelules":             C.sante,
  "Mgd collagene marin 90 gelules":  C.sante,
  "Mgd Foie De Morue 140 Cap":       C.sante,
  "Mgd Gelee Royale Pollen 90gelules": C.sante,
  "Mgd Nopal 120 Gelules":           C.sante,
  "Mgd Propolis 120gelules":         C.sante,
  "Mgd Silicium organique flacon 500ml": C.sante,
  "Mgd Zinc+ B6  60 gelules":        C.sante,
  "Midal E Vitamine E pure 30caps": C.sante,
  // Molutrex warts
  "Molutrex": C.santeSoins,
  // Mycogel antifungal
  "Mycogel 150Ml": C.santeSoins,
  // Nature Soin
  "Nature Soin Amandes Douces":              C.corpsSoins,
  "Nature Soin Avocat":                      C.corpsSoins,
  "Nature Soin Beaute A La Rose":            C.corpsSoins,
  "Nature Soin Coco":                        C.corpsSoins,
  "Nature Soin Creme Depilatoire Avocat 50ml": C.corpsHygiene,
  "Nature Soin Creme Protectrice Desodorisante 30ml": C.corpsHygiene,
  "Nature Soin Essentielle Lavande":         C.sante,
  "Nature Soin Essentielle Romarin":         C.sante,
  "Nature Soin Glycerine":                   C.corpsSoins,
  "Nature Soin Jojoba":                      C.cheveuxBio,
  "Nature Soin Lavande":                     C.sante,
  "Nature Soin Ricin":                       C.cheveuxBio,
  "Nature Soin Romarin 50Ml":                C.sante,
  "Nature Soin Sesame":                      C.corpsSoins,
  "Nature Soin Vaseline /1Kg":               C.corpsSoins,
  "Nature Soin Vaseline 450 G":              C.corpsSoins,
  "Nature Soin Vaseline nature 120Ml":       C.corpsSoins,
  "Nature Soin Vaseline Pur 50Ml":           C.corpsSoins,
  "Nature Soin Vasline nature Tube 45G":     C.corpsSoins,
  // Neutrogena
  "Neutrogena Creme Main sans Parfum 50 ml": C.corpsMains,
  "Neutrogena Creme Mains originale 50 ml":  C.corpsMains,
  // New Derm
  "New Derm Creme Emolliente 250ml":          C.corpsSoins,
  "New Derm Ecran Invisible Toucher Sec spf50+": C.visageSolaire,
  "New Derm Ecran Spf 50+ Beige Dore":        C.visageSolaire,
  "New Derm Ecran Spf 50+ Opale":             C.visageSolaire,
  "New Derm Gel Surgras 250ml":               C.corpsHygiene,
  // Novahair
  "Novahair Huile Precieuse Anti-Chute 100ml": C.cheveux,
  "Novahair Lotion Anti-Chute spf30 125ml":    C.cheveux,
  "Novahair Shamp Anti-Chute 250ml":           C.cheveuxShamp,
  // Novobac antiseptic soap
  "Novobac Savon 100g": C.santeSoins,
  // Novophane hair
  "Novophane 60 capsules":                  C.sante,
  "Novophane Ds shamp antipelliculaire 125ml": C.cheveuxShamp,
  "Novophane K shamp antipelliculaire 125ml":  C.cheveuxShamp,
  "Novophane Reactional Lotion Anti-chute 100ml": C.cheveux,
  "Novophane Shamp Energisant 200ml":         C.cheveuxShamp,
  // Nuhanciam
  "Nuhanciam Lait Eclairsissant Corps 500ml": C.corpsSoins,
  // Supplements
  "Nutrimax Spiruline 120 Comp":  C.sante,
  "Nutrimax Spiruline 240 Comp":  C.sante,
  // Nyda anti-poux
  "Nyda spray 50ml": C.cheveuxPoux,
  // Oleoskin
  "Oleoskin Creme Had & Vit 40ml": C.visageSoin,
  // Supplements
  "Omegacoeur 60capsules": C.sante,
  // Omron blood pressure
  "Omron Tensiometre Brassard M2 Basic": C.santeTests,
  // On Call glucometers
  "On call Extra bandelette 50pcs": C.santeTests,
  "On Call Plus Bandelette 50":     C.santeTests,
  // Opticlude eye patches
  "Opticlude adulte 20pcs":  C.santeNez,
  "Opticlude junior 20pcs":  C.santeNez,
  // Orfine
  "Orfine Ecran Invisible": C.visageSolaire,
  "Orfine Ecran Opaque":    C.visageSolaire,
  // Cotton tips
  "Oromed Coton Tige 200pcs": C.santeSoins,
  // Oropropolis dental
  "Oropropolis Baume Bucco Gingival": C.dentaire,
  "Oropropolis spray buccal":         C.dentaire,
  "Oropropolis Tablettes":            C.dentaire,
  // Supplements bone
  "Osteocare 30comprimes":      C.sante,
  "Osteocare Liquide 200ML":    C.sante,
  // Otezia hair
  "Otezia SPH lotion Anti-chute  100ml": C.cheveux,
  // Supplements
  "Oxyskin Collagene Elastine 60gelules": C.sante,
  "Perfectil 30comprimes":                C.sante,
  // Photoderm Bioderma
  "Photoderm Ar T30Ml Spf 50":                              C.visageSolaire,
  "Photoderm Ecran Fluide Max spf100 40ml":                 C.visageSolaire,
  "Photoderm Ecran Fluide Teinte Tres Claire Max spf100 40ml": C.visageSolaire,
  "Photoderm Max spf50+ Aquafluide 40ml":                   C.visageSolaire,
  // Photoskin
  "Photoskin Ecran solaire invisible spf50+ 50ml": C.visageSolaire,
  // Supplements
  "Physalis Magnesium + Vit C 30cps": C.sante,
  // Pregnacare
  "Pregnacare Avant conception 30cps": C.materniteMaman,
  // Supplements
  "Premium Magnesium Glycinate 40gelules": C.sante,
  // Pro vital exfoliating glove
  "Pro vital gant gommage": C.corpsHygiene,
  // Hair care
  "Pur Naturel Nutri-Baume Chvx 100ml": C.cheveux,
  // Puress anti-parasitaire
  "Puress Assanissant Spray Textiles Antiparasitaire 150ml": C.santeSoins,
  // Puriaderm
  "Puriaderm Puriactiv lait corporel 150ml":   C.corpsSoins,
  "Puriaderm Puriphan lotion anti chute 120ml": C.cheveux,
  "Puriaderm puriphan serum therapeutique 60ml": C.cheveux,
  // Quies ear
  "Quies cire Anti-bruit 3 paires":  C.santeNez,
  "Quies Cire Naturelle 8 paires":   C.santeNez,
  "Quies Protec Audit Foam 3 paires": C.santeNez,
  "Quies Sil Adulte":                C.santeNez,
  // Racine Vita
  "Racine Vita Amande Douces 40ml":              C.corpsSoins,
  "Racine Vita Creme Hydratation Intensive 100ml": C.corpsSoins,
  "Racine Vita Eau De Rose 125ml":               C.visageSoin,
  "Racine Vita Huile de Coco 300gr":             C.corpsSoins,
  "Racine Vita Ricin 40ml":                      C.cheveuxBio,
  "Racine Vita Savon A la poudre de perle Vit E 80gr": C.corpsHygiene,
  "Racine Vita Savon a la Vitamine C 80g":       C.corpsHygiene,
  "Racine Vita Serum Intensif Contour des Yeux 10ml": C.visageSoin,
  "Racine Vita Serum Vitamine C 20% 10ml":       C.visageSoin,
  "Racine Vita Serum Vitamine E 10ml":            C.visageSoin,
  "Racine Vita Sulfurine Savon au Soufre 80gr":  C.corpsHygiene,
  "Racine Vita Vaseline Sans Parfum 120g":        C.corpsSoins,
  // Rayonnelle
  "Rayonnelle ecran solaire invisible spf50+ 50ml":         C.visageSolaire,
  "Rayonnelle Mousse Nettoyante Hydratant Eclaircissante 150ml": C.visageSoin,
  // RC
  "RC Creme Lavant Surgras UHT 500ml":     C.corpsHygiene,
  "RC Huile Lavant Surgras UHT 500ml":     C.corpsHygiene,
  "RC Mycolea+ Soin Toilette Intime 200ml": C.hygIntime,
  "Rc Soin lavant Intime Extra-doux 250ml": C.hygIntime,
  // Revox B77
  "Revox B77 Buzz Face cleansing gel 180ml":         C.visageSoin,
  "Revox B77 Just Azelaic Acid 10% 30ml":            C.visageSoin,
  "Revox B77 Just Caffeine 5% 30ml":                 C.visageSoin,
  "Revox B77 Just Daily Sun Shield SPF50+ 30ml":     C.visageSolaire,
  "Revox B77 Just Glycolic Acid 20% 30ml":           C.visageSoin,
  "Revox B77 Just Hyaluronic Acid 5% Hydrating Fluid 30ml": C.visageSoin,
  "Revox B77 Just Niacinamide 10% Daily Moisturiser 30ml":  C.visageSoin,
  "Revox B77 Just Salicylic Acid 2% Peeling solution 30ml": C.visageSoin,
  "Revox B77 Just Serum Alpha Arbutin 2%+ HA 30ml":  C.visageSoin,
  "Revox B77 Just Vitamine C 20% serum Anti-Oxydant 30ml":  C.visageSoin,
  "Revox B77 Retinol Serum Unifying Regenator 30ml": C.visageSoin,
  "Revox B77 Zitcare Aha.Bha.Pha Face Toner 250ml":  C.visageSoin,
  // Rosakalm
  "Rosakalm creme anti-rougeurs 40ml": C.visageSoin,
  // La Roche-Posay (Rp)
  "Rp Anthelios Brume Fraiche Spray spf50 75ml":        C.corpsSolaire,
  "Rp Anthelios Cr Fondante UVMUNE 400 spf50+ 50ml":    C.visageSolaire,
  "Rp Anthelios Cr Fondante UVMUNE 400 Teinte spf50+ 50ml": C.visageSolaire,
  "Rp Anthelios Fluide UVMUNE 400 Invisible spf50+ 50ml": C.visageSolaire,
  "Rp Cicaplast B5 Spray 100ml":       C.corpsSoins,
  "Rp Cicaplast Baume B5+ 100ml":      C.corpsSoins,
  "Rp Cicaplast Baume B5+ 40ml":       C.visageSoin,
  "Rp Cicaplast Baume B5+ spf50 40ml": C.visageSolaire,
  "Rp Cicaplast Gel B5 Accelerateue 40ml": C.visageSoin,
  "Rp Cicaplast Gel Lavant B5 200ml":  C.corpsHygiene,
  "Rp Eau Thermale 150ml": C.visageSoin,
  "Rp Eau Thermale 300ml": C.visageSoin,
  "Rp Effaclar A.I 15ml":                        C.visageSoin,
  "Rp Effaclar A.Z. Gel creme 40ml":             C.visageSoin,
  "Rp Effaclar Duo+ M 40ml":                     C.visageSoin,
  "Rp Effaclar Duo+ M Patch 22 Patchs":          C.visageSoin,
  "Rp Effaclar Duo+ spf30 40ml":                 C.visageSolaire,
  "Rp Effaclar Gel Espumante 200ml":             C.visageSoin,
  "Rp Effaclar Gel Moussant 400ml":              C.visageSoin,
  "Rp Effaclar Gel Moussant PGS 300ml":          C.visageSoin,
  "Rp Effaclar Gel Moussant Purifiant Refill Recharge 400ml": C.visageSoin,
  "Rp Effaclar Gel Purifiant Micro-Peeling 200ml": C.visageSoin,
  "Rp Effaclar Gel purifiant micro-peeling 400ml": C.visageSoin,
  "Rp Effaclar H Iso-Biome Creme 40ml":          C.visageSoin,
  "Rp Effaclar H Iso-Biome Creme Lavante 200ml": C.visageSoin,
  "Rp Effaclar H Iso-Biome Creme Lavante 390ml": C.visageSoin,
  "Rp Effaclar K+ Soin Renov P.Grasse 40ml":     C.visageSoin,
  "Rp Effaclar Mat 40ml":                        C.visageSoin,
  "Rp Effaclar Serum Ultra Concentre 30ml":       C.visageSoin,
  "Rp Hyalu B5 Serum 30ml": C.visageSoin,
  "Rp Hydraphase HA legere 50ml":   C.visageSoin,
  "Rp Hydraphase HA Riche 50ml":    C.visageSoin,
  "Rp Hydraphase Intense Yeux 15ml": C.visageSoin,
  "Rp Kerium Shamp Doux 400ml": C.cheveuxShamp,
  "Rp Lipikar Baume Ap+ M 200ml":    C.corpsSoins,
  "Rp Lipikar Baume Ap+ M 400ml":    C.corpsSoins,
  "Rp Lipikar Gel Lavant 400ml":     C.corpsHygiene,
  "Rp Lipikar Huile Lavante Ap+ 400ml": C.corpsHygiene,
  "Rp Lipikar Lait 400ml":           C.corpsSoins,
  "Rp Lipikar Lait Urea 10% 400ml":  C.corpsSoins,
  "Rp Lipikar Pain Surgras 150G":    C.corpsHygiene,
  "Rp Lipikar Syndet Ap+ 200ml":     C.corpsHygiene,
  "Rp Lipikar Syndet Ap+ 400ml":     C.corpsHygiene,
  "Rp Mela B3 Gel Micro-Peeling 200ml": C.visageSoin,
  "Rp Mela B3 Serum 30ml":              C.visageSoin,
  "Rp Mela B3 Serum 50ml":              C.visageSoin,
  "Rp Mela B3 spf30 40ml":              C.visageSolaire,
  "Rp Pigmentclar Yeux 15ml": C.visageSoin,
  "Rp Pure Vitamine C12 Serum 30ml":   C.visageSoin,
  "Rp Redermic Vitamine C Yeux 15ml":  C.visageSoin,
  "Rp Retinol B3 Serum 30ml":          C.visageSoin,
  "Rp Toleriane Dermallergo creme 40ml":     C.visageSoin,
  "Rp Toleriane Dermallergo nuit 40ml":      C.visageSoin,
  "Rp Toleriane Dermo Nett 400ml":           C.visageSoin,
  "Rp Toleriane Rosaliac AR concentre 40ml": C.visageSoin,
  "Rp Toleriane Sensitive 40ml":             C.visageSoin,
  "Rp Toleriane Sensitive Riche 40ml":       C.visageSoin,
  // SDM
  "SDM Glu White Glutathione 60 gelules": C.sante,
  // Sebionex
  "Sebionex Gel Ecran Matifiant 40Ml":       C.visageSolaire,
  "Sebionex Gel Nettoyant 200ml":            C.visageSoin,
  "Sebionex Hydra 40Ml":                     C.visageSoin,
  "Sebionex pain dermatologie purifiant 100g": C.visageSoin,
  "Sebionex Trio Creme Correctrice 40Ml":    C.visageSoin,
  // Bioderma Sebium
  "Sebium Gel Moussant 200ml":       C.visageSoin,
  "sebium gel moussant actif 200ml": C.visageSoin,
  "Sebium H2O 500Ml":                C.visageSoin,
  "Sebium hydra 40ml":               C.visageSoin,
  "Sebium Mat control soin hydratant 30Ml": C.visageSoin,
  // Bioderma Sensibio
  "Sensibio AR+ creme 40ml":          C.visageSoin,
  "Sensibio Defensive creme 40ml":    C.visageSoin,
  "Sensibio Defensive riche creme 40ml": C.visageSoin,
  "Sensibio Ds Creme 40Ml":           C.visageSoin,
  "Sensibio Ds+ Gel Moussant 200Ml":  C.visageSoin,
  "Sensibio Gel moussant 500ml":      C.corpsHygiene,
  "Sensibio gel moussant nettoyant 200ml": C.visageSoin,
  "Sensibio H2O 250ml":               C.visageSoin,
  "Sensibio H2O 500Ml":               C.visageSoin,
  "Sensibio Mask 75ml":               C.visageSoin,
  // Sensilis
  "Sensilis Sun Secret Fluid Color Spf50+ 50ml": C.visageSolaire,
  "Sensilis Sun Secret Fluid Spf50+ 50ml":        C.visageSolaire,
  // Sensitelial
  "Sensitelial Gel nettoyant 500Ml": C.corpsHygiene,
  "Sensitelial Soin Apaisant 40Ml":  C.visageSoin,
  // Sesderma
  "Sesderma Azelac Ru serum 30Ml":         C.visageSoin,
  "Sesderma c-vit creme hydratante 50ml":  C.visageSoin,
  "Sesderma c-vit radiance Fluide 50ml":   C.visageSoin,
  "Sesderma repaskin sun Fluide Invisible spf50 50ml": C.visageSolaire,
  // Skin 1004
  "Skin 1004  Poremizing Clear Toner 210ml":         C.visageSoin,
  "Skin 1004  Poremizing Deep Cleansing Foam 125ml": C.visageSoin,
  "Skin 1004 Air-Fit Suncream plus spf50+ 50ml":     C.visageSolaire,
  "Skin 1004 Ampoule 30ml":                          C.visageSoin,
  "Skin 1004 Ampoule 55ml":                          C.visageSoin,
  "Skin 1004 Ampoule Foam 20ml":                     C.visageSoin,
  "Skin 1004 Cream 75ml":                            C.visageSoin,
  "Skin 1004 Hyalu-Cica Blue Serum 30ml":            C.visageSoin,
  "Skin 1004 Hyalu-Cica Brightening Toner 210ml":    C.visageSoin,
  "Skin 1004 Hyalu-Cica First Ampoule 50ml":         C.visageSoin,
  "Skin 1004 Hyalu-Cica Moisture Cream 75ml":        C.visageSoin,
  "Skin 1004 Hyalu-Cica Silky-Fit Sun Stick 20g":    C.visageSolaire,
  "Skin 1004 Hyalu-Cica Water-fit Sun Serum spf50+ 50ml": C.visageSolaire,
  "Skin 1004 Light Cleansing Oil 200ml":             C.visageSoin,
  "Skin 1004 Light Cleansing oil 30ml":              C.visageSoin,
  "Skin 1004 Poremizing Fresh Ampoule 50ml":         C.visageSoin,
  "Skin 1004 Poremizing Light Gel Cream 75ml":       C.visageSoin,
  "Skin 1004 Poremizing Quick Clay Stick Mask 27g":  C.visageSoin,
  "Skin 1004 Probio-Cica Bakuchiol Eye Cream 20ml":  C.visageSoin,
  "Skin 1004 Probio-Cica Enrich cream 50ml":         C.visageSoin,
  "Skin 1004 Probio-Cica Essence Toner 210ml":       C.visageSoin,
  "Skin 1004 Probio-Cica Intensive Ampoule 50ml":    C.visageSoin,
  "Skin 1004 Soothing Cream 75ml":                   C.visageSoin,
  "Skin 1004 Tea-Trica Purufying Toner 210ml":       C.visageSoin,
  "Skin 1004 Tea-Trica Relief Ampoule 100ml":        C.visageSoin,
  "Skin 1004 Tea-Trica Spot Cream 20ml":             C.visageSoin,
  "Skin 1004 Tone Brightening Boosting Toner 210ml": C.visageSoin,
  "Skin 1004 Tone Brightening Capsule Ampoule 50ml": C.visageSoin,
  "Skin 1004 Tone Brightening Capsule Cream 75ml":   C.visageSoin,
  "Skin 1004 Tone Brightening Cleasing Gel Foam 125ml": C.visageSoin,
  "Skin 1004 Toning Toner 210ml":                    C.visageSoin,
  // Skintech
  "Skintech Melablock HSP spf50 tube 50ml": C.visageSolaire,
  // Sodermix scar
  "Sodermix": C.santeSoins,
  // Soleil Biafine
  "Soleil Biafin Ecran 50+":            C.visageSolaire,
  "Soleil Biafine Lait Solaire 50+ 150Ml": C.corpsSolaire,
  // Supplements
  "Spirit Magnesium Glycinate 30gelules":   C.sante,
  "Spirit Vitamine B12 30comprimes":        C.sante,
  "Spirit Vitamines D3 & k2 60capsules":    C.sante,
  // Sunskin
  "Sunskin 60 Tube 50ml": C.visageSolaire,
  // SVR
  "Svr Ampoule Anti-Ox C 30ml":                       C.visageSoin,
  "Svr Ecran sun secure blur spf50+ 50ml":            C.visageSolaire,
  "Svr Ecran sun secure fluide spf50+ 50ml":          C.visageSolaire,
  "Svr Ecran sun secure mineral teinte pnm 50+ 60g":  C.visageSolaire,
  "svr sebiaclear active gel 40ml":                   C.visageSoin,
  "SVR Sebiaclear ampoule flash 30ml":                C.visageSoin,
  "svr sebiaclear creme spf50 40ml":                  C.visageSolaire,
  "svr sebiaclear gel moussant 200ml":                C.visageSoin,
  "svr sebiaclear gel moussant 400ml":                C.visageSoin,
  "Svr Sebiaclear hydra creme 40ml":                  C.visageSoin,
  "Svr Sensifine AR creme spf50+ 40ml":               C.visageSolaire,
  "Svr Topialyse Palpebral creme 15ml":               C.visageSoin,
  // Swissderma
  "Swissderma creme anti-imperfection 50ml":       C.visageSoin,
  "Swissderma creme anti-taches pigmentaires 50ml": C.visageSoin,
  "Swissderma creme hydratante legere 50ml":        C.visageSoin,
  // Tranacix
  "Tranacix creme 30g": C.visageSoin,
  // Trikare hair
  "Trikare C Shamp Anti-Chute 200ml":      C.cheveuxShamp,
  "Trikare K Shamp Anti-Seborrheique 200ml": C.cheveuxShamp,
  // Urgo
  "Urgo Ampoule Dicret talon Moyen format bte de 5pcs": C.corpsMains,
  "Urgo Ampoules Talon Sport bte de 5pcs":              C.corpsMains,
  "Urgo Aphtes 6ml":                                    C.dentaire,
  "Urgo Aqua-protect 10pcs":                            C.santeSoins,
  "Urgo Aquafilm 10 Pts 2T":                            C.santeSoins,
  "Urgo Arnica Tube 50g":                               C.santeSoins,
  "Urgo Bouton De Fievre":                              C.santeSoins,
  "Urgo compresses sterisoin Oculaires Adulte 10un":    C.santeSoins,
  "Urgo compresses Sterisoin oculaires juniors 10pcs":  C.santeSoins,
  "Urgo Coricide 12Pts":                                C.corpsMains,
  "Urgo Coton Hydrophile 100G":                         C.santeSoins,
  "Urgo Coton Hydrophile 50G":                          C.santeSoins,
  "Urgo coton sterisoin hydrophile non sterile 100g":   C.santeSoins,
  "Urgo coton sterisoin hydrophile non sterile 50g":    C.santeSoins,
  "Urgo discreet 10pcs":                                C.santeSoins,
  "Urgo discreet 20pcs":                                C.santeSoins,
  "Urgo Gel Aphtes Junior 8ml":                         C.dentaire,
  "Urgo Ongles Abimes 3.3Ml":                          C.corpsMains,
  "Urgo Resistant /10pcs":                              C.santeSoins,
  "Urgo resistant 20 pcs":                              C.santeSoins,
  "Urgo sensitive 20 pcs":                              C.santeSoins,
  "Urgo Spray Froid 150 Ml":                            C.santeSoins,
  "Urgo Spray Froid 400Ml":                             C.santeSoins,
  "Urgo Strips 100Mmx 6 Unitee":                        C.santeSoins,
  "Urgo Strips 100X12.5 Unitee":                        C.santeSoins,
  "Urgo tatto dressings animal 8pcs":                   C.santeSoins,
  "Urgo Tul 15X20 1 unite":                             C.santeSoins,
  "Urgo Verrues":                                       C.santeSoins,
  // Uriage
  "Uriage bariederm cica creme reparatrice 40Ml":       C.visageSoin,
  "Uriage Bariederm Fissures Et Crevasses Pot 40g":     C.corpsMains,
  "Uriage bariesun ecran fluide anti-tache spf50+ 40ml": C.visageSolaire,
  "Uriage Bariesun Ecran Spf50+ Creme Hydratante 50ml": C.visageSolaire,
  "Uriage Bariesun Ecran Teinte Claire 50ml":            C.visageSolaire,
  "Uriage Creme Lavante 1L":                            C.corpsHygiene,
  "Uriage Creme Lavante 500Ml":                         C.corpsHygiene,
  "Uriage D.S Emulision 40ml":                          C.visageSoin,
  "Uriage Depiderm Mousse Nettoyant eclat 100ml":       C.visageSoin,
  "Uriage Ds Hair lotion antipelliculaire 100mL":       C.cheveux,
  "Uriage Eau thermale lait veloute 500Ml":             C.corpsSoins,
  "Uriage Ecran Total Ip 90 50Ml":                      C.visageSolaire,
  "Uriage gel surgras dermatologique 1L":               C.corpsHygiene,
  "Uriage gel Surgras Dermotologique 500ml":            C.corpsHygiene,
  "Uriage huile lavant 500ml":                          C.corpsHygiene,
  "uriage hyseac 3 regul+ 40ml":                        C.visageSoin,
  "Uriage Hyseac Gel Nettoyant 150Ml":                  C.visageSoin,
  "Uriage Hyseac Mat 40ml":                             C.visageSoin,
  "Uriage Hyseac Spf 50":                               C.visageSolaire,
  "Uriage Roseliane Creme Anti Rougeurs 40Ml":          C.visageSoin,
  "Uriage roseliane creme riche 50 ml":                 C.visageSoin,
  "Uriage Roseliane Dermo Nettoyant 250M":              C.visageSoin,
  "Uriage Stick Levres 4G":                             C.visageSoin,
  "Uriage Xemose Huile 500ml":                          C.corpsSoins,
  "Uriage Xemose Huile lavante 200ml":                  C.corpsHygiene,
  "Uriage Xemose Stick Levres 4G":                      C.visageSoin,
  // UV Control
  "Uv Control Ecran Opaque": C.visageSolaire,
  // Vapovick nasal inhalation
  "Vapovick":                  C.santeNez,
  "Vapovick inhalateur codex": C.santeNez,
  // Vaseline
  "Vaseline Officinale Pommade 45g":  C.corpsSoins,
  "Vaseline Salicylee 10% 120G":      C.corpsMains,
  "Vaseline Salicylee 30% 120G":      C.corpsMains,
  "Vaseline Salicylee 5% 120g":       C.corpsMains,
  // Velpeau bandages
  "Velpeau Bande de crepe 10cm": C.santeSoins,
  "Velpeau Bande de crepe 15cm": C.santeSoins,
  "Velpeau Bande de crepe 5cm":  C.santeSoins,
  "Velpeau Bande de crepe 7cm":  C.santeSoins,
  // Verruxid warts
  "verruxid": C.santeSoins,
  // Supplements
  "Vertu plus Ashwaganda 60 gelules":          C.sante,
  "Vertu Plus B Complex Plus Vitamines 60gel": C.sante,
  "Vertu plus chardon marie 90gelules":        C.sante,
  "Vertu plus collagene marin 90gelules":      C.sante,
  "Vertu plus Melatonine 2mg 60 gelules":      C.sante,
  "Vertu plus omega 3 1000mg 50capsules":      C.sante,
  "Vertu plus Propolis 30gelules":             C.sante,
  "Vertu plus Vitamine D3 60cps":              C.sante,
  "Vertu Plus Zinc For 60gelules":             C.sante,
  // Vichy (Vh) sunscreens
  "Vh Capital Soleil Creme Anti Tache 3en1 50ml":     C.visageSolaire,
  "Vh Capital Soleil Creme Onctueuse 50+ 50ml":       C.visageSolaire,
  "Vh Capital Soleil Ecran Bb Anti-Brillance Teinte 50ml": C.visageSolaire,
  "Vh Capital Soleil Emulsion Anti-Brillance spf50+ 50ml": C.visageSolaire,
  "Vh Capital Soleil Matifiant 3en1 spf50+ 50ml":     C.visageSolaire,
  "Vh Capital Soleil UV-Age Daily spf50+ 40ml":       C.visageSolaire,
  // Depilatory
  "Vh Creme Depilatoire 150ml": C.corpsHygiene,
  // Deodorants
  "Vh Deo Bill Mineral 48H 50ml":                      C.corpsHygiene,
  "Vh Deo Bille Anti Trace Blanche":                   C.corpsHygiene,
  "Vh Deo Bille Bouchon Vert 48h":                     C.corpsHygiene,
  "Vh Deo Clinical Control Femme 96H 50ml":            C.corpsHygiene,
  "Vh Deo Clinical Control Homme 96H 50ml":            C.homme,
  "Vh Deo Dermo Detranspirant Invisible Resist 72h 50ml": C.corpsHygiene,
  "Vh Deo Eclaircissant":                              C.corpsHygiene,
  "Vh Deo Traitement Anti-Trnspirant Eff 7Jours":     C.corpsHygiene,
  "Vh Deodorant Aerosol Anti-Traces Blanches & Jaunes": C.corpsHygiene,
  "Vh Deodorant Anti Transpirant Aerosol":             C.corpsHygiene,
  "Vh Deodorant Bille Bouchon Blanc":                  C.corpsHygiene,
  "Vh Deodorant Mineral Spray 48H 125ml":              C.corpsHygiene,
  // Thermal water
  "Vh Eau Thermale 150Ml": C.visageSoin,
  // Homme
  "Vh Homme Deo Bille Anti-Trans 72H":                 C.homme,
  "Vh Homme deo invisible resist dermo detranspirant 72h 50ml": C.homme,
  "Vh Homme Deodorant Vaporisateur 100Ml":             C.homme,
  "Vh Homme Mousse A Raser Anti- Irri":                C.homme,
  "Vh Homme Sensi Baume Ca":                           C.homme,
  // Liftactiv face
  "Vh Liftactiv Collagen Specialiste 50ml":    C.visageSoin,
  "Vh Liftactiv Derm Source Nuit 50Ml":        C.visageSoin,
  "Vh Liftactiv Derme Source Yeux 15Ml":       C.visageSoin,
  "Vh liftactiv retinol specialist serum 30ml": C.visageSoin,
  "Vh Liftactiv specialist B3 serum 30ml":      C.visageSoin,
  "Vh Liftactiv supreme Vitamine C serum 20ml": C.visageSoin,
  "VH mineral 89 50ml":                         C.visageSoin,
  // Normaderm
  "Vh Normaderm Fluide double correction Hydratant 50ml":    C.visageSoin,
  "Vh Normaderm Physolution Gel Purifiant Intense 200ml":    C.visageSoin,
  "Vh Normaderm physolution gel purifiant intense 400ml":    C.visageSoin,
  // Vita Citral lip balm
  "Vita Citral Baume Levres 15ml": C.visageSoin,
  // Supplements
  "Viticap Actifs & vitamines 60 gel": C.sante,
  // Vitilium
  "Vitilium Creme 50ml": C.visageSoin,
  // VT Cosmetics
  "VT Cosmetics Reed Shot 100 50ml": C.visageSoin,
  "VT Cosmetics Reed Shot 300 50ml": C.visageSoin,
  "VT Cosmetics Reed Shot 700 30ml": C.visageSoin,
  // Supplements
  "Wellwoman Zinc 15mg 30capsules": C.sante,
  // Xerolys foot care
  "Xerolys 50": C.corpsMains,
  // Zeniac
  "Zeniac Gel Purifiant Fl 200Ml": C.visageSoin,
  // Zyoderm
  "Zyoderm Creme Eclaircissante x3 100ml":        C.visageSoin,
  "Zyoderm Creme Solaire Invisible Anti-tache Spf50+": C.visageSolaire,
  "Zyoderm Gel Nettoyant 400ml":                  C.visageSoin,
};

// Run
const { data: products } = await sb.from("products").select("id, name");
console.log(`\nClassifying ${products.length} products…\n`);

let ok = 0, skipped = 0, fail = 0;
const unmapped = [];

for (const product of products) {
  const newCatId = MAP[product.name];
  if (!newCatId) {
    unmapped.push(product.name);
    skipped++;
    continue;
  }
  const { error } = await sb
    .from("products")
    .update({ category_id: newCatId })
    .eq("id", product.id);
  if (error) { console.error(`  ✗ ${product.name}:`, error.message); fail++; }
  else ok++;
}

console.log(`\nUpdated: ${ok} | Unmapped: ${skipped} | Failed: ${fail}`);
if (unmapped.length > 0) {
  console.log("\n⚠ Unmapped products:");
  unmapped.forEach(n => console.log("  •", n));
}

// Print distribution
const { data: cats } = await sb.from("categories").select("id, name, parent_id");
const catById = new Map(cats.map(c => [c.id, c]));
const { data: updated } = await sb.from("products").select("category_id");
const counts = {};
for (const p of updated) {
  counts[p.category_id] = (counts[p.category_id] || 0) + 1;
}
console.log("\n📊 Distribution:");
for (const [catId, count] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
  const cat = catById.get(catId);
  const parent = cat?.parent_id ? catById.get(cat.parent_id) : null;
  const label = parent ? `${parent.name} > ${cat.name}` : cat?.name ?? catId;
  console.log(`  ${label}: ${count}`);
}
console.log("\n✅ Done");
