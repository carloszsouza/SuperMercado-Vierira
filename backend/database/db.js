
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env")
});

const { createClient } = require("@supabase/supabase-js");

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("Variáveis do Supabase não foram carregadas.");
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

console.log("Cliente Supabase configurado!");

module.exports = supabase;
