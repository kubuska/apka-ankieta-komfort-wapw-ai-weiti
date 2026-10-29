export const genders=['Kobieta','Mężczyzna','Inna','Wolę nie podawać'];
export const temperatures=['Za zimno','W sam raz','Za ciepło'];
export const yesNo=['Tak','Nie'];
export type Answers={gender:string;seat:number|null;temperature:string;stuffy:string;headache:string;focus:number|null;comment:string};
export const emptyAnswers:Answers={gender:'',seat:null,temperature:'',stuffy:'',headache:'',focus:null,comment:''};
export function validateAnswers(v:any):Record<string,string>{
 const errors:Record<string,string>={};
 if(!genders.includes(v?.gender))errors.gender='Wybierz odpowiedź dotyczącą płci.';
 if(!Number.isInteger(v?.seat)||v.seat<1||v.seat>9)errors.seat='Zaznacz jedno z dziewięciu miejsc.';
 if(!temperatures.includes(v?.temperature))errors.temperature='Oceń temperaturę.';
 if(!yesNo.includes(v?.stuffy))errors.stuffy='Wybierz Tak lub Nie.';
 if(!yesNo.includes(v?.headache))errors.headache='Wybierz Tak lub Nie.';
 if(!Number.isInteger(v?.focus)||v.focus<1||v.focus>20)errors.focus='Zaznacz poziom skupienia od 1 do 20.';
 if(typeof v?.comment!=='string'||v.comment.trim().length>500)errors.comment='Komentarz może mieć maksymalnie 500 znaków.';
 return errors;
}
export function validResponse(v:any){return !!v && typeof v.id==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v.id)&&Object.keys(validateAnswers(v)).length===0;}

