DELIMITER //
CREATE TRIGGER before_manga_insert
AFTER INSERT ON Manga
FOR EACH ROW
BEGIN
    INSERT INTO HistoriqueManga (mangaId, title, linkManga, linkImage, chapter)
    VALUES (NEW.id, NEW.title, NEW.linkManga, NEW.linkImage, NEW.chapter);
END;
//

CREATE TRIGGER before_manga_update
AFTER UPDATE ON Manga
FOR EACH ROW
BEGIN
        INSERT INTO HistoriqueManga (mangaId, title, linkManga, linkImage, chapter)
        VALUES (NEW.id, NEW.title, NEW.linkManga, NEW.linkImage, NEW.chapter);
END;
//
DELIMITER ;
