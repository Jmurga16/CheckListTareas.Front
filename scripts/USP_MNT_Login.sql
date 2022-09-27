
             
CREATE PROCEDURE [dbo].[USP_MNT_Login]          
            
	@nOpcion INT,   
	@pParametro VARCHAR(max)
                                                                                   
AS     

BEGIN

	BEGIN
				
		DECLARE @sUsuario	 VARCHAR(MAX);
		DECLARE @Password	 VARCHAR(MAX);
    	
	END
	
	--VARIABLE TABLA
	BEGIN

		DECLARE @tParametro TABLE (
			id int,
			valor varchar(max)
		);

	END

	--Descontena el parametro con split
	BEGIN
		IF(LEN(LTRIM(RTRIM(@pParametro))) > 0)
			BEGIN
			    INSERT INTO @tParametro (id, valor ) SELECT id, valor FROM dbo.Split(@pParametro, '|');
			END;
	END;
        
		         
	IF @nOpcion = 1  -- ACCESO
	BEGIN  
		BEGIN
			SET @sUsuario	= (SELECT valor FROM @tParametro WHERE id = 1);	
			SET @Password	= (SELECT valor FROM @tParametro WHERE id = 2);	
		END	
        
		BEGIN
			
			IF((SELECT COUNT(*) FROM TBL_Login WHERE sUsuario = @sUsuario AND sPassword=@Password)>0)
				BEGIN
					SELECT '1|Se ingresó con éxito'					
				END
			ELSE
				BEGIN
					SELECT '0|Credenciales incorrectas'										
				END


        END                                               
	END;    
	
END
