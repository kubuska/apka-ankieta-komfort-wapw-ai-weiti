import { getDb } from '../../../db';
import { responses } from '../../../db/schema';
import { validResponse } from '../../../lib/survey';
export async function POST(req:Request){
 if(req.headers.get('origin')!==new URL(req.url).origin)return Response.json({error:'Niedozwolone źródło.'},{status:403});
 if(!req.headers.get('content-type')?.includes('application/json'))return Response.json({error:'Wymagany JSON.'},{status:415});
 try{
  const reader=req.body?.getReader();if(!reader)return Response.json({error:'Brak danych.'},{status:400});
  let raw='';let size=0;const decoder=new TextDecoder();while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>8192){await reader.cancel();return Response.json({error:'Za dużo danych.'},{status:413});}raw+=decoder.decode(value,{stream:true});}raw+=decoder.decode();
  let v;try{v=JSON.parse(raw);}catch{return Response.json({error:'Niepoprawny JSON.'},{status:400});}
  if(!validResponse(v))return Response.json({error:'Sprawdź odpowiedzi w ankiecie.'},{status:400});
  await getDb().insert(responses).values({id:v.id,rating:v.focus,frequency:'comfort-v2',comment:JSON.stringify({gender:v.gender,seat:v.seat,temperature:v.temperature,stuffy:v.stuffy,headache:v.headache,comment:v.comment.trim(),version:2}),createdAt:new Date().toISOString()}).onConflictDoNothing();
  return Response.json({ok:true},{headers:{'Cache-Control':'no-store'}});
 }catch{return Response.json({error:'Zapis jest chwilowo niedostępny.'},{status:503});}
}
