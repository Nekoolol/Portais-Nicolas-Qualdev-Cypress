<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Traitement des données JSON</title>
</head>
<body>
    <?php
            if (isset($_POST['json_data'])) {
                $json_data = $_POST['json_data'];
                $data = json_decode($json_data, true);

                if ($data !== null) {
                    echo "<h1>".$data['name']"</h1>"
                    foreach ($data['info'] as $item) {
                        echo "<h2>".$item['nom']"</h2>"
                        echo "<table>";
                        echo "<thead>
                        <tr>
                            <th>Entreprise</th>
                            <th>Ville</th>
                            <th>Mots-clés</th>
                            <th>Nombre de stages</th>
                        </tr>
                        </thead>";
                        echo "<tbody>";
                        foreach ($item['informations'] as $info) {
                            echo "<tr>";
                            echo "<td>" . $info['nomEnt'] . "</td>";
                            echo "<td>" . $info['ville'] . "</td>";
                            echo "<td>" . $info['motsClefs'] . "</td>";
                            echo "<td>" . $info['nbStage'] . "</td>";
                            echo "</tr>";
                        }
                        echo "</tbody></table>";
                    }
                } else {
                    echo "<tr><td colspan='4'>Aucune donnée JSON reçue ou format invalide.</td></tr>";
                }
            }
            ?>
</body>
</html>