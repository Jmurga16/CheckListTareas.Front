

CREATE PROCEDURE [dbo].[USP_MNT_Task]          
            
	@nOpcion INT,   
	@pParametro VARCHAR(max)
                                                                                   
AS     

BEGIN

	BEGIN
		
		DECLARE @nIdTask     INT;
		DECLARE @sNameTask     VARCHAR(MAX);
		
		DECLARE @isActive BIT;
		DECLARE @isDone BIT;
    			

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
        
		
	IF @nOpcion = 1   --CONSULTAR TAREAS  
	BEGIN	                                                                                                                                                     
			SELECT 
				task.nIdTask,
				task.isDone,
				task.sNameTask,				
				task.isActive
			FROM [TBL_Task] task
			WHERE
				task.isActive = 1
				                                                                 
	END;                                     

	ELSE IF @nOpcion = 2  --INSERTAR  (R)                                                        
	BEGIN
		BEGIN
			
			SET @sNameTask	= (SELECT valor FROM @tParametro WHERE id = 1);
			SET @isDone	    = (SELECT valor FROM @tParametro WHERE id = 2);
			SET @isActive		= (SELECT valor FROM @tParametro WHERE id = 3);

		END	

		BEGIN
    
					INSERT INTO [TBL_Task]
							    (sNameTask,isDone, isActive)
					VALUES	(@sNameTask, @isDone, @isActive)

					SELECT '1|Se registró con éxito'
          			
		END
		
	END
	   
	   
	ELSE IF @nOpcion = 3  -- ACTUALIZAR REALIZADO   (U)                                                        
	BEGIN
		BEGIN
			SET @nIdTask			= (SELECT valor FROM @tParametro WHERE id = 1);
			SET @isDone				= (SELECT valor FROM @tParametro WHERE id = 2);	
			
		END	

		UPDATE [TBL_Task]                           
		SET 
			isDone			 = @isDone
		WHERE 
			nIdTask = @nIdTask                          
		   
		SELECT '1|Se actualizó con éxito'
                                                       
	END;                            

                                                           
	ELSE IF @nOpcion = 4  -- ELIMINAR (D)                                                          
	BEGIN  
		BEGIN
			SET @nIdTask	= (SELECT valor FROM @tParametro WHERE id = 1);	
			SET @isActive	= (SELECT valor FROM @tParametro WHERE id = 2);	
		END	
        
		BEGIN
				
			--Eliminacion Logica
			  UPDATE TBL_Task
				  SET	 isActive = 0
			    WHERE 
				    nIdTask = @nIdTask

			  SELECT '1|Se actualizó con éxito'

        END                                               
	END;                                                        
     
	
END
