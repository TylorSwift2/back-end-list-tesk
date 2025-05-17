package lista.lista.controller;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tarefas")
public class controler {

    private List<String> tarefas = new ArrayList<>();

    @PostMapping("/add")
    public Map<String, String> adicionarTarefa(@RequestBody Map<String, String> payload) {
        String tarefa = payload.get("tarefa");
        tarefas.add(tarefa);
        Map<String, String> response = new HashMap<>();
        response.put("mensagem", "Tarefa adicionada: " + tarefa);
        return response;
    }
    
    @GetMapping("/listar")
    public List<String> listar() {
        return tarefas;
    }

    @DeleteMapping("/removerIndex")
    public Map<String, String> removerPorIndex(@RequestBody Map<String, Integer> payload) {
        int index = payload.get("index");
        Map<String, String> response = new HashMap<>();
        if (index >= 0 && index < tarefas.size()) {
            tarefas.remove(index);
            response.put("mensagem", "Removido com sucesso");
        } else {
            response.put("mensagem", "Índice inválido");
        }
        return response;
    }

    @DeleteMapping("/removerTudo")
    public Map<String, String> removerTodas() {
        tarefas.clear();
        Map<String, String> response = new HashMap<>();
        response.put("mensagem", "Todas as tarefas foram removidas");
        return response;
    }
}
