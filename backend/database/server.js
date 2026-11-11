const express = require("express");
const path = require("path");
const supabase = require("./database/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "..")));

// Teste da API
app.get("/api/teste", (req, res) => {
  res.json({
    sucesso: true,
    mensagem: "API funcionando corretamente!"
  });
});

// Buscar produtos
app.get("/api/produtos", async (req, res) => {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Erro Supabase:", error);

    return res.status(500).json({
      erro: "Erro ao buscar produtos",
      detalhes: error.message
    });
  }

  res.json(data);
});

// Cadastrar produto
app.post("/api/produtos", async (req, res) => {
  const { nome, preco, estoque } = req.body;

  if (!nome || preco === undefined || estoque === undefined) {
    return res.status(400).json({
      erro: "Nome, preço e estoque são obrigatórios"
    });
  }

  const { data, error } = await supabase
    .from("produtos")
    .insert([
      {
        nome,
        preco,
        estoque
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Erro Supabase:", error);

    return res.status(500).json({
      erro: "Erro ao cadastrar produto",
      detalhes: error.message
    });
  }

  res.status(201).json({
    sucesso: true,
    mensagem: "Produto cadastrado!",
    produto: data
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
