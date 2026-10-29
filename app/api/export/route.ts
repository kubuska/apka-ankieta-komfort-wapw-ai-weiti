import {env} from 'cloudflare:workers';
import {getDb} from '../../../db';
import {responses} from '../../../db/schema';
import {desc,eq,ne} from 'drizzle-orm';
export async function GET(req:Request){
 const token=(env as unknown as {ADMIN_TOKEN?:string}).ADMIN_TOKEN;
 if(!token||req.headers.get('Authorization')!=='Bearer '+token)return Response.json({error:'Nieprawidłowy klucz.'},{status:401,headers:{'Cache-Control':'no-store'}});
 try{
 const legacy=new URL(req.url).searchParams.get('dataset')==='legacy';
 const rows=await getDb().select().from(responses).where(legacy?ne(responses.frequency,'comfort-v2'):eq(responses.frequency,'comfort-v2')).orderBy(desc(responses.createdAt)).limit(10000);
 const header=legacy?['ID','Data UTC','Ocena','Częstotliwość','Komentarz']:['ID','Data UTC','Płeć','Pole sali (1–9)','Rząd od tablicy (1–3)','Kolumna (lewa/środek/prawa)','Temperatura','Duszno','Ból głowy','Skupienie (1–20)','Wpływ na skupienie'];
 const data=rows.map(r=>{if(legacy)return [r.id,r.createdAt,r.rating,r.frequency,r.comment];const a=JSON.parse(r.comment);return [r.id,r.createdAt,a.gender,a.seat,Math.floor((a.seat-1)/3)+1,['lewa','środek','prawa'][(a.seat-1)%3],a.temperature,a.stuffy,a.headache,r.rating,a.comment];});
 const cell=(v:unknown)=>'"'+String(v??'').replace(/^[=+@\-\t\r]/,"'$&").replace(/"/g,'""')+'"';
 const csv='\uFEFF'+[header,...data].map(row=>row.map(cell).join(';')).join('\r\n');
 return new Response(csv,{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="'+(legacy?'poprzednia-ankieta':'komfort-odpowiedzi')+'.csv"','Cache-Control':'no-store'}});
 }catch{return Response.json({error:'Eksport niedostępny.'},{status:503});}
}
