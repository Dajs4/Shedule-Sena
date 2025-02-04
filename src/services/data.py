from faker import Faker
import random
import json
from datetime import datetime, timedelta

fake = Faker()

# Generar IDs únicos para cada entidad
id_programas = list(range(1, 11))
id_fichas = list(range(1, 11))
id_competencias = list(range(1, 11))
id_resultados = list(range(1, 11))
id_trimestres = list(range(1, 11))
id_tematicas = list(range(1, 11))
id_ambientes = list(range(1, 11))
id_instructores = list(range(1, 11))
id_bloques = list(range(1, 11))

# Generar programas de formación
programas = [
    {"idProgramaDeF": id_, "tipo": fake.boolean(), "nombre": fake.sentence(nb_words=3), "duracion": str(fake.time())}
    for id_ in id_programas
]

# Generar fichas
fichas = [
    {"idFicha": id_, "numero": fake.random_int(min=10000, max=99999), "fk_id_ProgramaDeFormacion": random.choice(id_programas)}
    for id_ in id_fichas
]

# Generar trimestres
trimestres = [{"idTrimestre": id_, "estado": fake.boolean()} for id_ in id_trimestres]

# Generar bloques de tiempo
bloques = [
    {
        "idBloque": id_,
        "fechaDia": str(fake.date_this_decade()),
        "horaInicio": str(fake.time()),
        "horaFin": str(fake.time())
    }
    for id_ in id_bloques
]

# Generar temáticas
tematicas = [
    {"idTematica": id_, "nombre": fake.sentence(nb_words=2), "fk_id_Bloque": random.choice(id_bloques)}
    for id_ in id_tematicas
]

# Generar competencias
competencias = [
    {"idCompetencia": id_, "nombre": fake.sentence(nb_words=3), "fk_id_Tematica": random.choice(id_tematicas)}
    for id_ in id_competencias
]

# Generar resultados de aprendizaje
resultados = [
    {"idResultadoDeA": id_, "nombre": fake.sentence(nb_words=4), "fk_id_Trimestre": random.choice(id_trimestres)}
    for id_ in id_resultados
]

# Generar ambientes
ambientes = [
    {"idAmbiente": id_, "numero": fake.random_int(min=1, max=50), "nombre": fake.sentence(nb_words=2)}
    for id_ in id_ambientes
]

# Generar instructores
instructores = [
    {"idInstructor": id_, "nombre": fake.first_name(), "apellido": fake.last_name(), "tipoContrato": fake.boolean()}
    for id_ in id_instructores
]

# Relaciones Muchos a Muchos
fichas_competencias = [{"fk_id_Ficha": random.choice(id_fichas), "fk_id_Competencia": random.choice(id_competencias)} for _ in range(10)]
competencias_rda = [{"fk_id_Competencia": random.choice(id_competencias), "fk_id_RDA": random.choice(id_resultados)} for _ in range(10)]
competencias_tematica = [{"fk_id_Competencia": random.choice(id_competencias), "fk_id_Tematica": random.choice(id_tematicas)} for _ in range(10)]
tematica_instructores = [{"fk_id_Tematica": random.choice(id_tematicas), "fk_id_Intructor": random.choice(id_instructores)} for _ in range(10)]
tematica_ambientes = [{"fk_id_Tematica": random.choice(id_tematicas), "fk_id_Ambiente": random.choice(id_ambientes)} for _ in range(10)]

# Generar clases para cada instructor (al menos 5 clases por instructor)
clases_por_instructor = [
    {"fk_id_Instructor": id_, "fk_id_Bloque": random.choice(id_bloques), "fk_id_Tematica": random.choice(id_tematicas)}
    for id_ in id_instructores for _ in range(5)
]

# Estructurar datos en JSON
data = {
    "programasDeFormacion": programas,
    "fichas": fichas,
    "trimestres": trimestres,
    "bloques": bloques,
    "tematicas": tematicas,
    "competencias": competencias,
    "resultadosDeAprendizaje": resultados,
    "ambientes": ambientes,
    "instructores": instructores,
    "fichasHasCompetencias": fichas_competencias,
    "competenciasHasResultadoDeAprendizaje": competencias_rda,
    "competenciasHasTematica": competencias_tematica,
    "tematicaHasInstructores": tematica_instructores,
    "tematicaHasAmbientes": tematica_ambientes,
    "clasesPorInstructor": clases_por_instructor
}

# Convertir a JSON
json_data = json.dumps(data, indent=4)
json_data