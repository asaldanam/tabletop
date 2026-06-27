---
code: PDR-002
name: Histórico auditable
---

## 🎯 1. Contexto y Problema

Los VTT (Virtual Tabletop) avanzados del mercado generalmente tienen las reglas del sistema de juego integradas para evitar que los jugadores realicen acciones que no estén permitidas por el sistema de juego.

Sin embargo a la práctica la problemática de una partida real no suele ser que los jugadores se salten las reglas, si no que no las recuerden o no las tengan claras. Esto lleva a situaciones donde la partida ha avanzado sobre una acción que no estaba permitida por el sistema de juego, y los jugadores no se dan cuenta hasta varias acciones después sin poder recordar la partida.

## 📋 2. Opciones Evaluadas

No hubo una evaluación formal de opciones.

## 🚀 3. Decisión Tomada

Queremos implementar un **histórico auditable de la partida** que permita a los jugadores revisar las acciones realizadas y el estado de la partida en cualquier momento, para poder verificar si una acción fue válida o no según las reglas del sistema de juego.

Cualquier jugador podrá revisar el histórico de la partida y ver las acciones realizadas por todos los jugadores, así como el estado de la partida en cualquier momento. Esto permitirá a los jugadores verificar si una acción fue válida o no según las reglas del sistema de juego, y tomar decisiones informadas sobre cómo continuar la partida.

El **GM (Game Master)** tendrá además la capacidad de retroceder a un punto anterior de la partida (_time machine_), para poder corregir una acción que no fue válida según las reglas del sistema de juego, y continuar la partida desde ese punto.
