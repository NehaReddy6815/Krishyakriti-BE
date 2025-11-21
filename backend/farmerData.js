import mongoose from "mongoose";
import dotenv from "dotenv";
import Farmer from "./models/Farmer.js";

dotenv.config();

const data = [
    {
    "name": "Dr. Y. K. Kotikal",
    "location": "Krishi Vigyan Kendra BAGALKOTÂ 587101",
    "phone": "9449866935"
  },
  {
    "name": "Dr. S. V. Suresh",
    "location": "Krishi Vigyan Kendra Haradanahalli",
    "phone": "9449866928"
  },
  {
    "name": "Dr. S. Shashikumar",
    "location": "Krishi Vigyan Kendra Brahmavara",
    "phone": "9449866933"
  },
  {
    "name": "Dr. N.Sivashankar",
    "location": "Krishi Vigyan Kendra Chamarajanagara",
    "phone": "9449866937"
  },
  {
    "name": "Mr. R.C.Deshmukh",
    "location": "KVK Bijapur, Agriculture Collage Campus, Bijapur – 586101",
    "phone": "9449864251"
  },
  {
    "name": "Dr. H. B. Patil",
    "location": "Krishi Vigyan Kendra Arabhavi, Dist. Belgaum -591218",
    "phone": "9448358771"
  },
  {
    "name": "Dr. C. Doreswamy",
    "location": "Krishi Vigyan Kendra Balekundri, Belgaum",
    "phone": "9449866934"
  },
  {
    "name": "Dr. K.M Srinivasa Murthy",
    "location": "Krishi Vigyan Kendra Chickballapur",
    "phone": "9449866940"
  },
  {
    "name": "Dr. D. Chandrappa",
    "location": "KVK Hadonahalli, Kolar",
    "phone": "9448303370"
  },
  {
    "name": "Dr.H..Hanumanthappa",
    "location": "Krishi Vigyan Kendra Hagari, Bellary",
    "phone": "9448495340"
  },
  {
    "name": "Dr. Devaraja T.N",
    "location": "Krishi Vigyan Kendra Kadalivana, LIC Coloney Lakkavalli",
    "phone": "9449856876"
  },
  {
    "name": "Dr. Jitendrakumar S. Hilli",
    "location": "Krishi Vigyan Kendra Saidapur Farm Dist. Dharwad",
    "phone": "9448495342"
  },
  {
    "name": "Dr. L.G.Hiregoudar",
    "location": "Dr. L.G.Hiregoudar",
    "phone": "9448358772"
  },
  {
    "name": "Sri. Raju G. Teggalli",
    "location": "Krishi Vigyan Kendra Aland Road, Dist. Gulbarga",
    "phone": "9448495344"
  },
  {
    "name": "Dr. K.C.Shashidhar",
    "location": "Krishi Vigyan Kendra Kandali Distt. Hassan",
    "phone": "9449866932"
  },
  {
    "name": "Dr. Y.R. Sevanna",
    "location": "Krishi Vigyan Kendra Hanumanamatti Dist. Haveri",
    "phone": "9448495338"
  },
  {
    "name": "Sri. K. Lokesh",
    "location": "Krishi Vigyan Kendra Gonikoppal Dist . Kodagu",
    "phone": "9480290345"
  },
  {
    "name": "Dr. N. Manjunath",
    "location": "Krishi Vigyan Kendra Chintamani Taluk Dist. Chickballapur",
    "phone": "9448158763, 9449866930"
  },
  {
    "name": "Dr. S.S.Prakash",
    "location": "Krishi Vigyan Kendra ARS Campus Kanakagiri Road Gangavati",
    "phone": "9448495343"
  },
  {
    "name": "Dr. H. S. Vinay",
    "location": "Krishi Vigyan Kendra VC Farm Dist. Mandya",
    "phone": "9449864250"
  },
  {
    "name": "Sri. P.M. Devaraju",
    "location": "Krishi Vigyan Kendra Suttur Nanjangud Taluk Dist. Mysore",
    "phone": "9945714129"
  },
  {
    "name": "Sri. M.H.Attar",
    "location": "Krishi Vigyam Kendra Post Box 329 RARS, College of Agriculture",
    "phone": "9448303373, 9448495341"
  },
  {
    "name": "Sri. M.R. Prabhakar",
    "location": "Krishi Vigyan Kendra P.B. No. 71, Navile, Dist. Shimoga",
    "phone": "9449866938"
  },
  {
    "name": "Sri. A.B.Channabasappa",
    "location": "Krishi Vigyan Kendra Konehalli Tiptur tq Dist. Tumkur",
    "phone": "9449866936"
  },
  {
    "name": "Sri. Sunil Kumar Kulkarni",
    "location": "Krishi Vigyan Kendra ZARS, Brahmavar Dist. Udupi",
    "phone": "9449866939"
  },
  {
    "name": "Sri. B.C. Sunil Kumar",
    "location": "Krishi Vigyan Kendra Banavasi Road, Sirsi Dist. Uttara Kannada",
    "phone": "9448495345"
  }


];


const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "krishyakriti" });
    console.log("Connected to DB");

    await Farmer.insertMany(data);
    console.log("Inserted farmers!");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();