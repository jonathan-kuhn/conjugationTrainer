# conjugationTrainer

<p>Trains the conjugation of verbes in different languages. (RN only french, but with a relatively small amount of effort this can be expanded)<br>
Run it any way you like, making this thing run as a docker container is on the todo.<br>
You will have to provide a .txt or .csv file with the infinitive forms of all your verbs when opening the website. the conjugated forms are then fetched from verbecc (check out the github, it's a cool project).<br>
This project supports Present, Past (Passé compose), Imperfect and Imperative time forms. It supports reflexive verbs, both with "s'" and "se "</p>
<p>You can <a href="https://conjugationtrainer.onrender.com/">try it out</a>. This is hosted using Render. It may take a few seconds to start. If you want it to be faster, you'll have to host it yourself.
<h2>Todo:</h2>
<ul>
  <li>Dockerize</li>
  <li>Add Conditional Présent (and possibly more)</li>
  <li>Possibly add error handling (e.g. no document added or no time form selected)</li>
  <li>Show if a verb was predicted or not</li>
</ul>

## License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.
See [LICENSE](LICENSE) for more details.