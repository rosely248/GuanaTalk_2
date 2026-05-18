<div class="container mt-5"> 
 
    <h2 class="mb-4">Nuestros Productos</h2> 
 
    <div class="row"> 
 
    <?php while($producto = $resultado->fetch_assoc()): ?> 
 
        <div class="col-md-4 mb-4"> 
            <div class="card h-100 shadow-sm"> 
 
                <img src="img/productos/<?php echo $producto['imagen']; ?>" 
class="card-img-top" alt=""> 
 
                <div class="card-body"> 
                    <h5 class="card-title"><?php echo $producto['nombre']; ?></h5> 
                     
                    <p class="card-text"> 
                        <?php echo $producto['descripcion']; ?> 
                    </p> 
 
                    <p class="fw-bold text-primary"> 
                        $<?php echo $producto['precio']; ?> 
                    </p> 
 
                    <a href="#" class="btn btn-primary">Ver más</a> 
                </div> 
 
            </div> 
        </div> 
 
    <?php endwhile; ?> 
 
    </div> 
 
</div> 
