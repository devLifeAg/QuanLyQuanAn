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
        Schema::create('quanlyketca', function (Blueprint $table) {
            $table->tinyInteger("kc_id",true,true);
            $table->tinyInteger("u_id")->unsigned();
            $table->double("kc_tongtien");
            $table->integer("kc_sl_hd");
            $table->dateTime("kc_ngaygio");
            $table->foreign('u_id')->references('u_id')->on('user')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quanlyketca');
        Schema::table('quanlyketca', function (Blueprint $table) {
            $table->dropForeign(['quanlyketca_u_id_foreign']);
            $table->dropIndex(['quanlyketca_u_id_foreign']);
        });
    }
};
