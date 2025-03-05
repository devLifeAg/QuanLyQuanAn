<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('phanloaimonan', function (Blueprint $table) {
            $table->tinyIncrements("pl_id",true,true);
            $table->string("pl_tenpl",50);
            $table->char('pl_tenhinh', 15);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phanloaimonan');
    }
};
