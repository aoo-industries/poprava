import * as fs from "fs";
import * as http from "http";

const getHer = (): string => {
  let readArray = [];
  try {
    readArray = JSON.parse(fs.readFileSync("./people.json").toString());
  } catch (e) {
    fs.writeFileSync("./people.json", "[]");
  }
  if (readArray.length > 28)
    return "<h1> Neser se do me, uz byli vybrani vsichni chudaci </h1>";
  let randomNumber = 0;
  while (readArray.includes(randomNumber)) {
    randomNumber = Math.ceil(Math.random() * 28);
  }
  readArray.push(randomNumber);
  fs.writeFileSync("./people.json", JSON.stringify(readArray));

  return `<h1>${randomNumber}</h1> <p> is the chosen one </p> <p> byl vybran </p>`;
};

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(getHer());
  })
  .listen(8351);
