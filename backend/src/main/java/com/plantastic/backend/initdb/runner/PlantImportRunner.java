package com.plantastic.backend.initdb.runner;

import com.plantastic.backend.initdb.dto.json.PlantDtoFromJson;
import com.plantastic.backend.initdb.service.JsonService;
import com.plantastic.backend.initdb.service.PlantImportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Slf4j
public class PlantImportRunner implements CommandLineRunner {

    private final PlantImportService importService;
    private final JsonService jsonService;

    public PlantImportRunner(PlantImportService importService, JsonService jsonService) {
        this.importService = importService;
        this.jsonService = jsonService;
    }

    @Override
    public void run(String... args) throws Exception {
        if (args.length > 0 && args[0].equals("import-plants")) {
            log.info("📥 Début de l'import...");

            //Penser à incrémenter la page de + 1 à chaque appel. On doit se retrouver avec 30 plantes de plus en BDD à chaque appel
//            importService.importThirtyPlantsFromApi(7);

//            importService.importOnePlantFromApi(748);

//            Mettre à jour le chemin du fichier JSON à chaque appel.
            String jsonFilePath = "data/backup/backup_bdd_20250718_155plants_.json";
            List<PlantDtoFromJson> plantListFromJson = jsonService.readBackupPlantDbJson(jsonFilePath);
            importService.importAllPlantsFromJson(plantListFromJson);
        }
    }
}
