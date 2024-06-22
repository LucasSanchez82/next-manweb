import fetchScanMangaBrut from '@/controller/mangas/fetchScanMangasBrut';
import { ScanMangaDatasType } from '@/schemas/scrappingDatasShemas';
import {expect, describe, it } from 'bun:test'

describe('test call api scan manga', async () => { 
    it('direct call api', async () => {
        const mangas: ScanMangaDatasType[] = []
        const setDistMangas= async (distMangas: ScanMangaDatasType) => {
            mangas.push(distMangas)
        }
        const fetchScanMangas = await fetchScanMangaBrut(setDistMangas, () => {});
        await fetchScanMangas('one piece');
        console.log(mangas);
        
          expect(mangas).toBeTruthy();
    });
 })