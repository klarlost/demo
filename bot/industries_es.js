/* Klarlöst – datos en español (lang=es). {f} = empresa, {g} = "de {f}". Claves no incluidas usan "default". */
window.KL_IND_ES = {
support:{label:"Atención al cliente",handoff:true,
 greet:"¡Hola! Bienvenido al soporte de {f}. Respondo las preguntas frecuentes al instante. Si no estoy seguro, te paso con una persona – con todo el historial del chat.",
 benefits:["Responde las preguntas frecuentes al instante desde una base de conocimiento aprobada (por ejemplo, una Google Sheet editable)","Pasa la conversación a una persona cuando no está seguro – e indica el motivo","Registra cada conversación: volumen diario, tasa de traspaso y preguntas sin respuesta"],
 qs:[
 {q:"¿Cuál es su horario?",kw:["horario","hora","abierto","abren","cierran"],a:"Nuestro equipo atiende de lunes a viernes – y este asistente responde 24/7. (En el bot real esta respuesta viene directamente de la hoja de preguntas frecuentes de {f}.)"},
 {q:"¿Cómo restablezco mi contraseña?",kw:["contraseña","clave","restablecer","acceso"],a:"Ve a la página de inicio de sesión, pulsa \"¿Olvidaste tu contraseña?\" y sigue el enlace que te enviamos por correo. El enlace es válido 24 horas."},
 {q:"¿Dónde está mi pedido?",kw:["pedido","dónde","donde","envío","envio","seguimiento"],a:"Lo reviso – por favor escribe tu número de pedido.",act:"order"},
 {q:"Quiero un reembolso",kw:["reembolso","devolución","devolucion","devolver"],a:"Los reembolsos siguen la política de {f}. He registrado tu solicitud – una persona del equipo te la confirmará.",act:"handoff"},
 {q:"Hablar con una persona",kw:["persona","humano","agente","hablar"],a:"Claro – te paso ahora con el equipo.",act:"handoff"}]},
ehandel:{label:"Tienda online",handoff:true,
 greet:"¡Hola! Bienvenido a {f}. Puedo revisar el estado de tu pedido, ayudarte con devoluciones y envíos, y pasarte con una persona si lo necesitas.",
 benefits:["Responde \"¿dónde está mi pedido?\" automáticamente con el número de pedido","Gestiona devoluciones y envíos 24/7 y escala el resto a una persona con todo el historial","Registra cada conversación para revisar calidad y tiempos de respuesta"],
 qs:[
 {q:"¿Dónde está mi pedido?",kw:["pedido","dónde","donde","envío","envio"],a:"Lo reviso – por favor escribe tu número de pedido.",act:"order"},
 {q:"¿Cómo hago una devolución?",kw:["devolución","devolucion","devolver","cambio"],a:"Puedes devolver productos dentro del plazo de {f}. En el bot real la devolución se crea aquí mismo y recibes la etiqueta por correo."},
 {q:"¿Cuánto tarda el envío?",kw:["tarda","plazo","envío","envio","entrega"],a:"Los plazos siguen las condiciones de {f} – el bot real muestra la estimación exacta para tu dirección."},
 {q:"Hablar con una persona",kw:["persona","humano","agente","queja"],a:"Claro – te paso con el equipo.",act:"handoff"}]},
leadgen:{label:"Captación de clientes",
 greet:"¡Hola! Bienvenido a {f}. Puedo responder preguntas sobre nuestros servicios, ver si encajamos y reservarte una llamada.",
 benefits:["Convierte visitas en clientes potenciales cualificados 24/7","Hace tus preguntas de cualificación antes de la llamada","Reserva llamadas directamente en tu calendario"],
 qualify:[{q:"¿En qué necesitas ayuda?",opts:["Proyecto nuevo","Soporte continuo","Solo explorando"]},{q:"¿Cuándo te gustaría empezar?",opts:["Este mes","1–3 meses","Más adelante"]},{q:"¿Qué presupuesto aproximado tienes?",opts:["Menos de $1k","$1k–5k","$5k+"]}],
 qs:[
 {q:"¿Qué servicios ofrecen?",kw:["servicios","ofrecen","hacen"],a:"En el bot real describo los servicios de {f}. ¿Vemos si encajamos?",act:"qualify"},
 {q:"Reservar una llamada",kw:["llamada","reservar","reunión","reunion"],a:"Perfecto – primero tres preguntas rápidas.",act:"qualify"},
 {q:"Pedir presupuesto",kw:["presupuesto","precio","cuesta"],a:"¡Claro! Cuéntame brevemente qué necesitas.",act:"quote"}]},
wellness:{label:"Bienestar y cursos online",handoff:true,
 greet:"¡Hola! Bienvenido a {f}. Puedo ayudarte con el acceso a cursos, pagos y reembolsos – y pasarte con el equipo si lo necesitas.",
 benefits:["Resuelve problemas de acceso al instante","Consulta el estado del pago y registra solicitudes de reembolso","Escala conversaciones complejas a una persona con todo el historial"],
 qs:[
 {q:"Pagué pero no puedo acceder al curso",kw:["acceso","acceder","pagué","pague"],a:"¡Lo siento! Escribe tu número de pedido o el correo con el que pagaste.",act:"order"},
 {q:"Quiero un reembolso",kw:["reembolso","devolver","cancelar"],a:"Entiendo. He registrado tu solicitud y la he pasado al equipo para su aprobación.",act:"handoff"},
 {q:"Hablar con una persona",kw:["persona","humano","agente"],a:"Claro – te paso con el equipo.",act:"handoff"}]},
default:{label:"Empresa",
 greet:"¡Hola! Bienvenido a {f}. Soy un asistente digital: respondo preguntas frecuentes, recojo solicitudes y te ayudo a reservar una cita, 24/7.",
 benefits:["Responde las preguntas de los clientes 24/7","Recoge solicitudes con la información correcta desde el principio","Reserva citas y envía recordatorios automáticamente"],
 qs:[
 {q:"¿Qué ofrecen?",kw:["ofrecen","servicios","productos"],a:"En el bot real describo los servicios de {f}. ¿Quieres que te contacten?",act:"contact"},
 {q:"Quiero un presupuesto",kw:["presupuesto","precio","cuesta"],a:"Cuéntame brevemente qué necesitas y {f} te enviará una propuesta.",act:"quote"},
 {q:"Reservar una cita",kw:["reservar","cita","reunión","reunion"],a:"Elige una hora abajo.",act:"book"},
 {q:"Hablar con una persona",kw:["persona","humano","hablar"],a:"Claro – te paso con el equipo.",act:"handoff"}]}
};
