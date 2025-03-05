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
        Schema::create('ban', function (Blueprint $table) {
            $table->tinyInteger("b_id",true,true);
            $table->string("b_tenban",30);
            $table->boolean("b_trangthai")->default(true);
            $table->tinyInteger("t_id")->unsigned();
            $table->foreign('t_id')->references('t_id')->on('tang')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ban');
        Schema::table('ban', function (Blueprint $table) {
            $table->dropForeign(['ban_t_id_foreign']);
            $table->dropIndex(['ban_t_id_foreign']);
        });
    }
};
