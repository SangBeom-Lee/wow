const app   = require('./src/app');     //app
const PORT  = process.env.PORT || 3000; //port 기본 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
