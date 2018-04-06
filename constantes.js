var Hinicio=9; //determina la hora de inicio de los turnos
var Hfin=17; //determina la hora del ultimo turno
var dias=18; //determina la cantidad de dias a mostrar en el calendario desde el dia de mañana siempre.
var ds=7; //determina los dias que contendran fechas ocupadas automaticas. debe ser menor  que dias. siempre.
FERIADOS=['20180213','20180324','20180330','20180402','20180501','20180525','20180620','20180709','20181208','20181225','20190101','20190304','20190305','20180324','20190402','20190501','20190525','20190620','20190709','20191208','20191225'];
//FERIADOS=['20180308','20180318','20180322'];
P=['Costo de la Instalacion $500 - bonficado.',        //precio fechas libres lun a vie
'Costo de la Instalacion $1500',                        //precio domingos
'Costo de la Instalacion $800',                         //precio sabados
'Costo de la Instalacion $2500',                        //precio feriados
'',                                                     //precio fecha ocupada
'Caso no contemplado error'];                           //error

semana= {0:'Domingo',1:'Lunes',2:'Martes',3:'Miercoles',4:'Jueves',5:'Viernes',6:'Sabado'};
mes={1:'Ene',2:'Feb',3:'Mar',4:'Abr',5:'May',6:'Jun',7:'Jul',8:'Ago',9:'Set',10:'Oct',11:'Nov',12:'Dic'};